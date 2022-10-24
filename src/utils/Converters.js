const convertFileToBase64Async = (file) => {
  if (!file) return '';

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
};

const convertBase64ToBlob = async (base64) => {
  return await fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      return {blob, url};
    });
};

export {convertFileToBase64Async, convertBase64ToBlob};
