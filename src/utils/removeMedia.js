const removeMedia = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Find and remove all <img> tags
    const images = doc.querySelectorAll('img');
    images.forEach(img => img.parentNode.removeChild(img));

    // Find and remove all <video> tags
    const videos = doc.querySelectorAll('video');
    videos.forEach(video => video.parentNode.removeChild(video));

    // Serialize the DOM structure back into an HTML string
    const serializer = new XMLSerializer();
    const modifiedHtmlString = serializer.serializeToString(doc);

    return modifiedHtmlString;
};
export default removeMedia;