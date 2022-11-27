import { ref } from 'vue'
import useFormState from '@/composables/add-update/useFormState'

export default function usePhotoHelpers() { 

    const { state } = useFormState()
    
    let previewPhoto = ref(null)

    const fileValidAndLoaded =  (uploadedFormFile) => {         
        return new Promise( (resolve) => { 
           
            let validExtension = checkFileExtension(uploadedFormFile.name)

            if (!validExtension) {
                return resolve(false)
            }    
            let reader = new FileReader()
            //start reading file user selected
            reader.readAsDataURL(uploadedFormFile)

            reader.onload = () => {
                loadImageToPreviewPhoto(reader)
                .then((success) => { return resolve(success) } )
            }   
        })  
    }

     const loadImageToPreviewPhoto = (fileReader) => { 
         return new Promise( (resolve) => {
            fileReader.onloadend = (event) => { 
                const img = new Image()
                img.src = fileReader.result
                img.onload = () => {
                    if (img.naturalHeight > img.naturalWidth) {
                        return resolve(false)
                    } 
                    previewPhoto.value = fileReader.result;   
                    return resolve(true)        
                }  
            }              
         })
     }

    const checkFileExtension = (filename) => {      
        let extension = filename.split('.').pop();
        let res = ['jpg', 'jpeg', 'png'].includes(extension.toLowerCase())
        return res
    }; 

    return {
        previewPhoto, fileValidAndLoaded, 
    }
}