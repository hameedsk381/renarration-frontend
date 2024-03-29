// Function to generate XPath for an element
const generateXPath = (element) => {
  const paths = [];

  // Loop through ancestors of the element
  for (; element && element.nodeType === Node.ELEMENT_NODE; element = element.parentNode) {
    let index = 0;
    // Get siblings of the current element
    for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
      // Count preceding siblings with the same tag name
      if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === element.nodeName) {
        ++index;
      }
    }
    // Build the XPath
    const tagName = element.nodeName.toLowerCase();
    const pathIndex = index ? `[${index + 1}]` : '';
    paths.unshift(tagName + pathIndex);
  }

  return paths.length ? `/${paths.join('/')}` : '';
};
export default generateXPath;
