
const fileUpload = async (file ) => {
    const cloudName = "dtjp5b2qr";
    const uploadPreset = "FoodyPreset";

    const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();


    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);


    try {
        const resp = await fetch(urlCloudinary, {
            method: "post",
            body: formData,
        });
    
        if (!resp.ok) {
            const errorData = await resp.json();
            console.error("Error en Cloudinary:", errorData);
            return null;
        }
    
        const data = await resp.json();
        return data.secure_url;
    } catch (error) {
        throw error;
    }
}

export default fileUpload;