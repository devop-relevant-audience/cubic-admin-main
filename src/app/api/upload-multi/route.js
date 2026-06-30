import { handleUpload } from "@vercel/blob";

export const runtime = "nodejs";

// API Route (Next.js App Router) - Client upload token generation
// The browser uploads files directly to Vercel Blob, bypassing this server
// (and any reverse proxy body-size limits). This route only issues tokens.
export async function POST(req) {
  const body = await req.json();

  const jsonResponse = await handleUpload({
    token: process.env.BLOB_READ_WRITE_TOKEN,
    request: req,
    body,
    onBeforeGenerateToken: async (pathname, clientPayload, multipart) => {
      return {
        // Max file size 50MB
        maximumSizeInBytes: 50 * 1024 * 1024,
        addRandomSuffix: false,
      };
    },
    onUploadCompleted: async (payload) => {
      // No server-side action needed on completion
    },
  });

  return Response.json(jsonResponse);
}
