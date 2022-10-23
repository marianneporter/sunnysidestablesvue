<template>
    <div class="photo-area">
        <input 
            type="file"                                     
            @change="photoAdded"                           
            ref="fileInput"> 



        <img v-if="!addMode && !photoState.uploadedPhoto"
            class="preview-photo"                        
            :src="photoState.currentPhotoUrl" >                 

        <img v-else class="preview-photo"                        
            :src="previewPhoto" >                                   
    
        <button class="btn btn-primary" type="button"
            @click="$refs.fileInput.click()"  >
            {{addMode ? 'Add' : photoForUpdate ? 'Update' : 'Add'}} Photo
            <!-- {{ (!addMode && horse.imageUrl) || uploadedPhoto ? 'Change Photo' : 'Add Photo' }}  -->
        </button>    

    
        <!-- <button mat-raised-button 
                class="reset-photo-btn photo-btn"
                *ngIf="previewPhoto"
            (click)="clearUploadPhoto()">
            Reset Photo                          
        </button>          
                        -->

    </div>   
</template>

<script setup>
    import { computed } from 'vue'

    import usePhotoHelpers from '@/composables/forms/add-update/usePhotoHelpers' 
    import useAddUpdate from '@/composables/forms/add-update/useAddUpdate' 

    const { photoState } = useAddUpdate()
    const { previewPhoto, fileValidAndLoaded } = usePhotoHelpers()
    const props = defineProps(['addMode'])   

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

</script>

<style lang="scss" scoped>

    .photo-area input {
        display: none;
    }

    @media screen and (min-width: 992px) {    
        .photo-area {
            margin-top: 30px;
            margin-bottom: 30px;

            .preview-photo {
                max-width: 150px;
                max-height: auto;
            }
        }    
    }



</style>