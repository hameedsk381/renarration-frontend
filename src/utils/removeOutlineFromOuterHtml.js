const removeOutlineFromOuterHtml = (outerHtmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(outerHtmlString, 'text/html');

  // Remove the outline from every element in the parsed document
  const allElements = doc.querySelectorAll('*');
  allElements.forEach((el) => {
    const ele = el;
    ele.style.outline = '';
  });

  const serializer = new XMLSerializer();
  const modifiedHtmlString = serializer.serializeToString(doc.documentElement);
  return modifiedHtmlString;
};
export default removeOutlineFromOuterHtml;
