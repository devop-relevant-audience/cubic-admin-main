/**
 * Uploads file to Vercel Blob via Next.js API route
 * @param {Object} param
 * @param {string} param.path - destination path/key in blob storage
 * @param {File|Blob} param.data - file or blob
 * @returns {Promise<{ result: boolean, url?: string, error?: string }>}
 */
function uploadData({ path, data }) {
  return {
    result: (async () => {
      try {
        const formData = new FormData();
        formData.append("file", data);
        formData.append("path", path);

        const res = await fetch("/api/upload-multi", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          return { result: false, error: "Upload failed: " + (await res.text()) };
        }

        const result = await res.json();
        return { result: true, url: result.url };
      } catch (err) {
        return { result: false, error: err.message };
      }
    })(),
  };
}

export { uploadData };
