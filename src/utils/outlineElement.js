function outlineElement(htmlString, dataId, outlineStyle = '2px solid red') {
  // Parse the HTML string into a DOM structure
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Find the element with the specific data-id
  const targetElement = doc.querySelector(`[data-id="${dataId}"]`);
  // console.log(targetElement)
  // If the element is found, modify its style to add an outline
  if (targetElement) {
    // console.log("element found")
    targetElement.style.outline = outlineStyle;
    // console.log(`added outlined to element ${targetElement.tagName}`)
  } else {
    // console.log("element not found")
  }
  // Serialize the DOM structure back into an HTML string
  const serializer = new XMLSerializer();
  const modifiedHtmlString = serializer.serializeToString(doc);
  // console.log(modifiedHtmlString);
  return modifiedHtmlString;
}
export default outlineElement;
