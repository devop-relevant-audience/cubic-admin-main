/**
 * Uploads large file to Next.js API (or Express) by splitting to chunks, uploading one by one.
 * @param {Object} param
 * @param {string} param.path - destination path/key in R2
 * @param {File|Blob} param.data - file or blob
 * @param {number} [param.partSize] - size of each chunk (default 10MB)
 * @returns {Promise<{ result: boolean, url?: string, error?: string }>}
 */
function uploadData({ path, data, partSize = 4 * 1024 * 1024 }) {
  return {
    result: (async () => {
      try {
        const totalSize = data.size;
        const partCount = Math.ceil(totalSize / partSize);

        // generate simple uploadId
        const uploadId = Date.now().toString() + Math.floor(Math.random() * 10000);

        // Upload all parts (sequentially, จะปรับเป็น parallel ก็ได้)
        for (let i = 0; i < partCount; i++) {
          const start = i * partSize;
          const end = Math.min(start + partSize, totalSize);
          console.log("start", start, "end", end, "partSize", partSize);
          const chunk = data.slice(start, end);

          const formData = new FormData();
          formData.append("file", chunk);
          formData.append("path", path);
          formData.append("uploadId", uploadId);
          formData.append("partNumber", i + 1); // 1-based index
          formData.append("totalParts", partCount);

          const res = await fetch("/api/upload-multi", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            return { result: false, error: `upload part ${i + 1} fail: ${await res.text()}` };
          }
        }

        // After all parts uploaded, notify server to merge
        const res = await fetch("/api/upload-final", {
          method: "POST",
          body: JSON.stringify({ path, uploadId, totalParts: partCount, contentType: data.type }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          return { result: false, error: "complete upload fail: " + (await res.text()) };
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
