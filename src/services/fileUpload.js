
const fileUpload = async (file ) => {
    const cloudName = "dc4czdj6f";
    const uploadPreset = "files-sprint-4";

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
        console.error("Error en la solicitud de carga:", error);
        return null;
    }
}

export default fileUpload;