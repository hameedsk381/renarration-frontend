function removeOutlineFromElement(htmlString, dataId) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  if (dataId) {
    const targetElement = doc.querySelector(`[data-id="${dataId}"]`);
    targetElement.style.outline = ''; // Remove the outline style
  } else {
    const allElements = doc.querySelectorAll('*');
    allElements.forEach((el) => {
      el.style.outline = ''; // Remove the outline style from all elements
    });
  }
  // console.log(`deleted block ${dataId}`)
  const serializer = new XMLSerializer();
  const modifiedHtmlString = serializer.serializeToString(doc);
  return modifiedHtmlString;
}
export default removeOutlineFromElement;