import { ref } from 'vue'
export default function useAddUpdateHelpers() { 
    
    let previewPhoto = ref(null)

    const generatePreviewPhoto =  (uploadedPhoto) => {

    
        /***************  !!!!!!!!to do vaidation of uploaded file */
        /************ !!!!!!!!!!!will probably need to set an error if wrong */

        let reader = new FileReader();
        //start uploading file user selected
        reader.readAsDataURL(uploadedPhoto);
        let res
    
        //display photo once file uploaded
        reader.onloadend = (_event) => { 
            const img = new Image();
            img.src = reader.result
            img.onload = () => { 
                const height = img.naturalHeight;
                const width = img.naturalWidth;
                if (height > width) {
                    alert('height of photo is greater than width!')
                    previewPhoto = null;
                    return;
                }
                console.log('in generatePreviewPhoto')
                console.log(reader.result)
                console.log('just before return from generatePreviewPhoto')
                previewPhoto.value = reader.result; 
              
            }               
        } 
       

    }

    return {
       generatePreviewPhoto, previewPhoto
    }
}