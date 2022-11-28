<template>
    <div class="photo-area">
        <div>
            <input 
                type="file"                                     
                @change="photoAdded"                           
                ref="fileInput"> 


            <img v-if="!addMode && !photoState.uploadedPhoto"
                class="preview-photo"                        
                :src="photoState.currentPhotoUrl" >                 

            <img v-else class="preview-photo"                        
                       :src="previewPhoto" >       
        </div>
                            
        <div class="btn-area">
            <button class="add-btn" type="button"
                @click="$refs.fileInput.click()"  >
                {{addMode ? 'Add' : photoForUpdate ? 'Update' : 'Add'}} Photo            
            </button>   
            <button class="reset-btn"
                    type="button"
                    @click="resetPhoto()"
                    v-if="photoForUpdate">Reset Photo</button> 
        </div>
    </div>   
</template>

<script setup>
    import { computed } from 'vue'

    import usePhotoHelpers from '@/composables/add-update/usePhotoHelpers' 
    import useFormState from '@/composables/add-update/useFormState' 

    const { photoState } = useFormState()
    const { previewPhoto, fileValidAndLoaded } = usePhotoHelpers()
      
    const props = defineProps({
        addMode: {
            type:Boolean,
            required: true
        }  
    }); 

    const photoForUpdate = computed(() =>  photoState.uploadedPhoto || photoState.currentPhotoUrl) 

    const photoAdded = (event) => {   
        
        fileValidAndLoaded(event.target.files[0]) 
            .then((res) => {
                if (res) {
                        photoState.uploadedPhoto=event.target.files[0]      
                    } else {
                    toaster.show(`Photo must be a jpeg or png file in landscape format`,
                                    {type: 'error'}) 
                }                 
            })
    }

    const resetPhoto = () => {
        photoState.uploadedPhoto = null
        previewPhoto.value = null
    } 

</script>

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss";  

    .photo-area input {
        display: none;
    }

    .photo-area {
        margin-top: 30px;
        display: flex; 
        column-gap: 10px; 
        justify-content: space-evenly; 
        button {
            display: block;
            height: 30px;
            width: 110px;
            border: none;
            border-radius: 10px;    
        }

        .preview-photo {
            max-width: 150px;
            max-height: auto;
        }

        .add-btn {   
            background-color: $primary;
            color: white;           
        }

        .reset-btn {
            margin-top: 10px;
            background-color: $secondary;
            color: white;    
        }
    }  

    @media screen and (max-width: 992px) {
        .photo-area {
            margin-top: 15px;
            margin-bottom: 30px;
            column-gap: 0;       
        }
    } 

</style>