export function extractPublicId(url) {
    // Example Cloudinary URL format: 
    // https://res.cloudinary.com/<cloud_name>/<resource_type>/<type>/<public_id>.<format>
    
    // Split the URL by '/'
    const parts = url.split('/');
    
    // Find the index of the public ID in the parts array
    const publicIdIndex = parts.indexOf('upload') + 1;
    
    // Get the public ID
    const publicId = parts[publicIdIndex];
    
    return publicId;
}

