import { ref } from 'vue'
export default function useAddUpdateHelpers() { 
    
    let previewPhoto = ref(null)

    const generatePreviewPhoto =  (uploadedPhoto) => {

        const acceptedImageExtensions = ['image/jpeg', 'image/png'];   
        if (!acceptedImageExtensions.includes(uploadedPhoto.type)) {
            return
        }

        let reader = new FileReader();
        //start uploading file user selected
        reader.readAsDataURL(uploadedPhoto);
    
        //display photo once file uploaded
        reader.onloadend = (_event) => { 
            const img = new Image();
            img.src = reader.result
            img.onload = () => { 
                const height = img.naturalHeight;
                const width = img.naturalWidth;
                
                if (height > width) {   
                    previewPhoto.value = null;
                    return;
                }    
                previewPhoto.value = reader.result;               
            }               
        } 
    }

    return {
       generatePreviewPhoto, previewPhoto
    }
}