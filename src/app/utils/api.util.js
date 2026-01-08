import { v4 as uuidv4 } from "uuid";
import { uploadData } from "@/app/utils/uploadData.util";
import { Amplify } from "aws-amplify";
import awsmobile from "@/config/aws.config";

Amplify.configure(awsmobile);

export const getBasePath = (key) => {
  return `public/${key}`;
};

export const getPathUrl = (key) => {
  // return `https://d2bqflr8m8bwzk.cloudfront.net/public/${key}`;
  // return `https://pub-4c959168d8674c2186033baca9574e4c.r2.dev/public/${key}`;
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

    await uploadData({
      // key: getBasePath(`${keyUpload}`),
      key: keyUpload,
      data: file,
    }).result;

    const responseUpload = {
      result: [
        {
          url: getPathUrl(keyUpload),
          name: files[0].name,
          size: files[0].size,
        },
      ],
    };

    await uploadHandler(responseUpload);
  })();
  uploadHandler();
};
