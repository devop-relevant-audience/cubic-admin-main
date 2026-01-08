export const getExtensionFile = (filename) => {
  return filename.split(".").pop();
};

function clearNumber(value = "") {
  return value.replace(/[^\d.]|\.(?=.*\.)/g, "");
}

export const formatNumber = (value) => clearNumber(value);
