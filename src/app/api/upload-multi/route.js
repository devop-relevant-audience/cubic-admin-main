import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import pathModule from "path";

export const runtime = "nodejs";

const R2_BUCKET = process.env.R2_BUCKET || "cubic";
const TMP_DIR = "/tmp/multipart-upload"; // temp path สำหรับเก็บแต่ละ part

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function clearOldChunks(minutes = 30) {
  const threshold = Date.now() - minutes * 60 * 1000;
  try {
    const files = await fs.readdir(TMP_DIR);
    for (const file of files) {
      const filePath = pathModule.join(TMP_DIR, file);
      const stat = await fs.stat(filePath);
      if (stat.mtimeMs < threshold) {
        await fs.unlink(filePath);
      }
    }
  } catch {}
}

async function ensureTmpDir() {
  try {
    await fs.mkdir(TMP_DIR, { recursive: true });
  } catch {}
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const path = formData.get("path") || file?.name || "unknown";
  const uploadId = formData.get("uploadId");
  const partNumber = formData.get("partNumber");
  const totalParts = formData.get("totalParts");

  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  // ถ้า multipart (มี uploadId, partNumber)
  if (uploadId && partNumber) {
    if (!totalParts) {
      return new Response(JSON.stringify({ error: "Missing totalParts" }), {
        status: 400,
      });
    }
    await clearOldChunks(30); // ลบ chunk เก่ากว่า 30 นาที
    await ensureTmpDir();
    const arrayBuffer = await file.arrayBuffer();
    // เก็บไฟล์แต่ละ part เป็น /tmp/multipart-upload/[uploadId].[partNumber]
    const tmpPath = pathModule.join(TMP_DIR, `${uploadId}.${partNumber}`);
    await fs.writeFile(tmpPath, Buffer.from(arrayBuffer));
    return new Response(
      JSON.stringify({ message: "part uploaded", uploadId, partNumber }),
      { status: 200 }
    );
  }

  // single part (upload ธรรมดา)
  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    return new Response(JSON.stringify({ error: "File too large" }), {
      status: 400,
    });
  }
  const arrayBuffer = await file.arrayBuffer();

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: path,
        Body: Buffer.from(arrayBuffer),
        ContentType: file.type,
      })
    );

    return new Response(
      JSON.stringify({
        url: `${process.env.R2_ENDPOINT}/${R2_BUCKET}/${path}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
