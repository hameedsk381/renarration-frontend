export default function extractPublicId(url) {
  const parts = url.split('/');
  const publicIdIndex = parts.indexOf('upload') + 1;
  const publicId = parts[publicIdIndex];
  return publicId;
}
