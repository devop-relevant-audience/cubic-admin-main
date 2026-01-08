import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import pathModule from "path";

const R2_BUCKET = process.env.R2_BUCKET || "cubic";
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const TMP_DIR = "/tmp/multipart-upload";

// ฟังก์ชันลบไฟล์ part ที่เก่ากว่า n นาที
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

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// API Route (Next.js App Router)
export async function POST(req) {
  try {
    const { path, uploadId, totalParts, contentType } = await req.json();

    // อ่านทุก part จาก /tmp
    const partBuffers = [];
    for (let i = 1; i <= totalParts; i++) {
      const partPath = pathModule.join(TMP_DIR, `${uploadId}.${i}`);
      const buf = await fs.readFile(partPath);
      partBuffers.push(buf);
      await fs.unlink(partPath); // ลบแต่ละ part หลังอ่าน
    }

    // รวมเป็นไฟล์เดียว
    const allBuffer = Buffer.concat(partBuffers);

    // อัปโหลดขึ้น R2
    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: path,
        Body: allBuffer,
        ContentType: contentType || undefined,
      })
    );

    // ลบ orphan chunk ที่อายุเกิน 30 นาที
    await clearOldChunks(30);

    return new Response(
      JSON.stringify({
        url: `${R2_ENDPOINT}/${R2_BUCKET}/${path}`,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
