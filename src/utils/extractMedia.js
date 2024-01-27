const extractMedia = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const images = doc.querySelectorAll('img');
    return Array.from(images).map(img => img.getAttribute('src'));
};
export default extractMedia;