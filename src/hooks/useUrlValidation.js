// useUrlValidation.js

export const useUrlValidation = (url) => {
  const isValidUrl = (urlString) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/|ipfs:\\/\\/)?'
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
        + '((\\d{1,3}\\.){3}\\d{1,3}))'
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*',
    );
    return !!urlPattern.test(urlString);
  };

  return isValidUrl(url);
};
