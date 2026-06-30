/**
 * Uploads file to Vercel Blob via direct client upload.
 *
 * The browser uploads directly to Vercel Blob storage, bypassing the
 * Next.js server (and any reverse proxy body-size limits). The server
 * only generates a short-lived client token via /api/upload-multi.
 *
 * @param {Object} param
 * @param {string} param.path - destination path/key in blob storage
 * @param {File|Blob} param.data - file or blob
 * @returns {{ result: Promise<{ result: boolean, url?: string, error?: string }> }}
 */
function uploadData({ path, data }) {
  return {
    result: (async () => {
      try {
        const { upload } = await import("@vercel/blob/client");

        const blob = await upload(path, data, {
          access: "public",
          handleUploadUrl: "/api/upload-multi",
          multipart: true,
        });

        return { result: true, url: blob.url };
      } catch (err) {
        return { result: false, error: err.message };
      }
    })(),
  };
}

export { uploadData };
