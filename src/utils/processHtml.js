export const processHtml = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const allElements = doc.querySelectorAll('*');

  allElements.forEach((el) => {
    el.removeAttribute('onclick');
    el.removeAttribute('href');
    // Add more attributes to remove if necessary
  });

  const serializer = new XMLSerializer();
  const modifiedHtmlContent = serializer.serializeToString(doc);
  return modifiedHtmlContent;
};
