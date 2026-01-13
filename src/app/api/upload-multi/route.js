import { put } from "@vercel/blob";

export const runtime = "nodejs";

// API Route (Next.js App Router) - Single or chunked upload
export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const path = formData.get("path") || file?.name || "unknown";

  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  // Max file size 50MB
  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    return new Response(JSON.stringify({ error: "File too large" }), {
      status: 400,
    });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { url } = await put(path, buffer, {
      access: "public",
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    });

    return new Response(
      JSON.stringify({ url }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
