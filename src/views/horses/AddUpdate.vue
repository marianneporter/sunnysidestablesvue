<template>
    <div class="content">           
        <form @submit.prevent="addUpdateHorse()" novalidate>
            <h3>Add Horse</h3>
            <div class="form-body">
                <div class="form-element p75-width">
                    <label>Name of horse:</label>
                    <input type="text" class="name-input p75-width "
                         v-model="v$.name.$model">  
                     <ValidationMsg :model="v$.name"/>             
                </div>               
              <div class="form-element p40-width">
                    <label>Date of Birth:</label>
                    <Datepicker v-model="v$.dob.$model"
                                format="dd MMM yyyy" />            
                    <ValidationMsg :model="v$.dob"/> 
                  </div>  
                 <div class="form-element p40-width">
                    <label>Colour:</label>
                    <Multiselect
                        v-model="v$.colour.$model"
                        :options="colours"/>  
                    <ValidationMsg :model="v$.colour"/>                     
                </div>    
                <div class="form-element p40-width">
                    <label>Sex:</label>   
                    <Multiselect
                        v-model="v$.sex.$model"
                        :options="sexes"/>  
                    <ValidationMsg :model="v$.sex"/>     
                </div>  

                <div class="form-element p40-width">
                    <label>Height(hands):</label>
                    <Multiselect
                        v-model="v$.height.$model"
                        :options="heights"/>   
                    <ValidationMsg :model="v$.height"/>         
                </div>  

                <div class="form-element owners-select">
                    <label>Owners:</label>
                    <Multiselect
                        v-model="v$.owners.$model"
                        mode="tags"
                        :close-on-select="false"
                        class="multiselect-owners"
                        :options=owners />
                </div>            
            </div>

            <div class="photo-area">
                 <input 
                    type="file"                                     
                    @change="photoAdded"                           
                    ref="fileInput">   
            

           
                    <img class="preview-photo"
                        :src="previewPhoto"
                   
                        alt="no preview photo"/>       
             

                         
                
                <button
                    class="btn btn-primary"
                    @click="$refs.fileInput.click()"  >Add Photo
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

            

            <div class="btn-area">
                <button>Cancel</button>
                <button>Add Horse</button>
            </div>  

 
        </form>        
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'   
    import Multiselect from '@vueform/multiselect'
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    import ValidationMsg from '@/components/ValidationMsg.vue'

    import useSelectOptions from '@/composables/useSelectOptions.js'
    import useAddUpdate from '@/composables/models/forms/useAddUpdate'
    import useAddUpdateHelpers from '@/composables/useAddUpdateHelpers'

    const route = useRoute()
 //   const owners = route.meta['owners']
   
 //   console.log(owners)    

    const { sexes, colours, heights, owners } = useSelectOptions()

    const { state, v$ } = useAddUpdate()

    console.log(v$.value)

    const { generatePreviewPhoto, previewPhoto } = useAddUpdateHelpers()

    const photoAdded = (event) => {
        console.log('in photo added')
        
        state.uploadedPhoto = event.target.files[0]

        previewPhoto.value =  generatePreviewPhoto(state.uploadedPhoto)

        console.log('after previewPhoto.value assigned')
    }



    const addUpdateHorse = () => {

    }

 
</script>


<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss";  


    form {
        background-color: white;
        padding: 15px;

        .form-element {
            margin-top: 20px;          

            & * {
                 display: block;    
            }
        }

        .name-input {
            border: 1px solid #D3D3D3;
            border-radius: 3px;
        }

 

        .p40-width {
            min-width: 40%;            
        }

        .p75-width {
            min-width: 75%;
        }
    }

    @media screen and (max-width: 992px) {
        .content {
            @include mobile-background;
        }

        form {
            width: 95%;
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 992px) {
        .content {
            @include desktop-background($formBackgroundImage, true, 0.75);  
        } 

        form {
            margin: 0 auto;
            width: 600px;
        //    height: 650px;   
            height: 100vh; 

            .form-body {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }  
        }

        .owners-select {
            width: 200px;
            
        }

        .form-element input {
 
            width: 200px;
            height: 40px;
        }

        .photo-area {
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }


    .owners-select {
        #multiselect {
            width: 100px;
        }
        .multiselect-owners {
            --ms-tag-bg: #f5f5f5;
            --ms-tag-color: #383838;
            --ms-ring-width: 0;
            --ms-tag-font-weight: 550;
        }  
    }

 

    .photo-area {

        input {
            display: none;
        }

        .preview-photo {
           max-width: 150px;
           max-height: auto;
        }

    }

</style>