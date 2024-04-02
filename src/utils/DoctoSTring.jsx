function DoctoString(htmlString) {
    // Create a new DOMParser object
    const parser = new DOMParser();
    
    // Parse the HTML string into a Document object
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    // Initialize an empty string to store the extracted text
    let text = '';
    
    // Traverse all text nodes in the document and concatenate their content
    function traverse(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            // If the node is a text node, append its content to the text string
            text += node.textContent.trim() + ' ';
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // If the node is an element node, recursively traverse its children
            for (let child of node.childNodes) {
                traverse(child);
            }
        }
    }
    
    // Start traversing the document from the root element
    traverse(doc.documentElement);
    
    // Return the extracted text
    return text.trim();
}

export default DoctoString;