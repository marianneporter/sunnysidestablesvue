<template>
    <div class="content">           
        <form novalidate @submit.prevent="addUpdateHorse()">
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
                                format="dd MMM yyyy"
                                :maxDate="new Date()"
                                :minDate="minValidDOB()" />            
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
                        max="5"
                        :close-on-select="false"
                        class="multiselect-owners"
                        :options="ownersForSelect"
                         />
                     <ValidationMsg :model="v$.owners"/>     
                </div>   
            </div>

            <div class="photo-area">
                <input 
                    type="file"                                     
                    @change="photoAdded"                           
                    ref="fileInput"> 
                    <img class="preview-photo"
                        :src="previewPhoto" >                              
            
            <button class="btn btn-primary" type="button"
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
                <a href="#">cancel back to list</a>
                <button type="submit">Add Horse</button>
            </div>   

        </form>  


 
    </div>
</template>

<script setup>
    //imports from vue
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'   
    import { useRouter } from 'vue-router'

    //imported plug-ins
    import Multiselect from '@vueform/multiselect'
    import Datepicker from '@vuepic/vue-datepicker';
    import { createToaster } from "@meforma/vue-toaster";
    import '@vuepic/vue-datepicker/dist/main.css';
    import ValidationMsg from '@/components/ValidationMsg.vue'

    //imported composables
    import useSelectOptions from '@/composables/forms/add-update/useSelectOptions.js'
    import useAddUpdate from '@/composables/forms/add-update/useAddUpdate'
    import usePhotoHelpers from '@/composables/forms/add-update/usePhotoHelpers'
    import usePrepareApiRequest from '@/composables/forms/add-update/usePrepareApiRequest'
    import useDates from '@/composables/useDates'
    import useDB from '@/composables/useDB'


    const route = useRoute()
    const router = useRouter()

    const toaster = createToaster({ position: 'bottom' });

    const owners = route.meta['owners']
     
    const ownersForSelect =
            owners.map((o)=> {           
                return {value: o.id.toString(), label: `${o.firstName} ${o.lastName}` }            
            }) 


    const { sexes, colours, heights } = useSelectOptions()

    const { state, v$ } = useAddUpdate()

    const { minValidDOB } = useDates()

    const { previewPhoto, fileValidAndLoaded } = usePhotoHelpers()

    const { formatFormData } = usePrepareApiRequest()

    const { addHorse } = useDB()

     
    const photoAdded = async (event) => {   
  
        fileValidAndLoaded(event.target.files[0]) 
            .then((res) => {
                if (res) {
                     state.uploadedPhoto=event.target.files[0]
                 } else {
                    toaster.show(`Photo must be a jpeg or png file in landscape format`,
                                 {type: 'error'}) 
                }                 
            })
    }

    const addUpdateHorse = () => {
        console.log('in add update horse')

        v$.value.$touch()
 
        if (v$.value.invalid) {            
            return
        }
       
        let formData = formatFormData()  

        let addedHorseInfo = await addHorse(formData)

        if (typeof addedHorseInfo === 'object') {
             router.push({ name: "details", params: { id: addedHorseInfo.id }} )
        } else {
            // go to list with error message cannot update at this time
        }
           
        
        
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
            padding: 5px;
        } 

        .p40-width {
            min-width: 40%;            
        }

        .p75-width {
            min-width: 75%;
        }
    }

    .photo-area input {
        display: none;
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
           background-color: pink;
        }

        .preview-photo {
           max-width: 150px;
           max-height: auto;
        }
    }

</style>