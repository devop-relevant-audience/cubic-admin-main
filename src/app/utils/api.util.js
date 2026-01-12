import { v4 as uuidv4 } from "uuid";
import { uploadData } from "@/app/utils/uploadData.util";

export const getBasePath = (key) => {
  return `public/${key}`;
};

// Vercel Blob store name
const BLOB_STORE_ID = process.env.NEXT_PUBLIC_BLOB_STORE_ID || "";

export const getPathUrl = (key) => {
  // If it's already a full URL (Vercel Blob returns full URLs), return as-is
  if (key?.startsWith("http://") || key?.startsWith("https://")) {
    return key;
  }
  
  // Legacy URLs from old storage (Cloudflare R2)
  // return `https://celestial-storage.space/public/${key}`;
  
  // Vercel Blob URL format: https://<store-id>.public.blob.vercel-storage.com/<path>
  if (BLOB_STORE_ID) {
    return `https://${BLOB_STORE_ID}.public.blob.vercel-storage.com/public/${key}`;
  }
  
  // Fallback for legacy data
  return `https://celestial-storage.space/public/${key}`;
};

export const getImgSrc = (file) => {
  if (!file) {
    return "/mockPhoto.jpg";
  }

  if (file?.size > 0) {
    return URL.createObjectURL(file);
  }

  return getPathUrl(file);
};

export const getFileTypeFromExtension = (fileName) => {
  if (fileName.name) {
    const extension = fileName.name?.split(".").pop().toLowerCase();

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const audioExtensions = ["mp3", "wav", "ogg", "m4a"];
    const videoExtensions = ["mp4", "mov", "wmv", "flv", "avi", "mkv"];

    if (imageExtensions.includes(extension)) {
      return "image";
    } else if (audioExtensions.includes(extension)) {
      return "audio";
    } else if (videoExtensions.includes(extension)) {
      return "video";
    } else {
      return "unknown";
    }
  }
  const extension = fileName?.split(".").pop().toLowerCase();

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const audioExtensions = ["mp3", "wav", "ogg", "m4a"];
  const videoExtensions = ["mp4", "mov", "wmv", "flv", "avi", "mkv"];

  if (imageExtensions.includes(extension)) {
    return "image";
  } else if (audioExtensions.includes(extension)) {
    return "audio";
  } else if (videoExtensions.includes(extension)) {
    return "video";
  } else {
    return "unknown";
  }
};

export const FileType = {
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  mp4: "video/mp4",
  pdf: "application/pdf",
};

export const TypeFile = Object.keys(FileType).reduce((acc, key) => {
  const value = FileType[key];
  acc[value] = key;
  return acc;
}, {});

export const onImageUploadBefore = (files, info, core, uploadHandler) => {
  if (!files && files === null && files === undefined && files < 0) return;
  (async () => {
    const file = files[0];

    const keyUpload = `${uuidv4()}.${TypeFile[file.type]}`;

    const uploadResult = await uploadData({
      path: getBasePath(keyUpload),
      data: file,
    }).result;

    const responseUpload = {
      result: [
        {
          url: uploadResult.url || getPathUrl(keyUpload),
          name: files[0].name,
          size: files[0].size,
        },
      ],
    };

    await uploadHandler(responseUpload);
  })();
  uploadHandler();
};
