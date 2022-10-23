<template>
    <div class="content">           
        <form novalidate @submit.prevent="addUpdateHorse()" enctype="multipart/form-data">
            <h3>{{addMode ? 'Add' : 'Update'}} Horse</h3>
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
                                :value="v$.dob.$model"
                                :startDate="v$.dob.$model"
                                :maxDate="new Date()"
                                :minDate="minValidDOB()" />            
                    <ValidationMsg :model="v$.dob"/> 
                    {{ v$.dob.$model }}
                  </div>  
                 <div class="form-element p40-width">
                    <label>Colour:</label>
                    <Multiselect
                        v-model="v$.colour.$model"
                        :label="v$.colour.$model"
                        :value="v$.colour.$model"
                        :options="colours"/>  
                    <ValidationMsg :model="v$.colour"/>                     
                </div>    
                <div class="form-element p40-width">
                    <label>Sex:</label>   
                    <Multiselect
                        v-model="v$.sex.$model"
                        :label="v$.sex.$model"
                        :value="v$.sex.$model"
                        :options="sexes"/>  
                    <ValidationMsg :model="v$.sex"/>     
                </div>  

                <div class="form-element p40-width">
                    <label>Height(hands):</label>
                    <Multiselect
                        v-model="v$.height.$model"
                        :label="v$.height.$model"
                        :value="v$.height.$model"
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
                        :options="ownersForSelect" />
                    <ValidationMsg :model="v$.owners"/>     
                </div>   
            </div>

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



            <div class="btn-area">
                <router-link :to="{ name: 'horseList'}" class="btn btn-secondary btn-full-mob">
                             <font-awesome-icon icon="fa-solid fa-arrow-left" />&nbsp;Back to List
                </router-link>
                <button type="submit"
                        class="btn btn-success btn-full-mob submit-btn"> {{addMode ? 'Add' : 'Update'}} Horse
                </button>                  
            </div>   
        </form>   
    </div>
</template>

<script setup>
    //imports from vue
    import { onUnmounted, ref, computed } from 'vue'
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
    import useHandleFormDataObject from '@/composables/forms/add-update/useHandleFormDataObject'
    import useMessageForNextPage from '@/composables/ui-state/useMessageForNextPage'
    import useDates from '@/composables/useDates'
    import useDB from '@/composables/useDB'

    const addMode = ref(false)

    const route = useRoute()
    const router = useRouter()

    const toaster = createToaster({ position: 'bottom' });

    const owners = route.meta['owners']

    // destructure composables 
    const { horse, addHorse, updateHorse } = useDB()
    const { sexes, colours, heights } = useSelectOptions()
    const { state, photoState, v$, clearState, setStateFields } = useAddUpdate()
    const { minValidDOB } = useDates()
    const { previewPhoto, fileValidAndLoaded } = usePhotoHelpers()
    const { horseFormData, 
            resetHorseForm,
            convertStateToFormDataFormat } = useHandleFormDataObject()
    const { setMessage } = useMessageForNextPage()

    const photoForUpdate = computed(() =>  photoState.uploadedPhoto || photoState.currentPhotoUrl)  

    onUnmounted(() => {  
        resetHorseForm()
        clearState()
    })

    // ui setup for owners select
    const ownersForSelect =
            owners.map((o)=> {           
                return {value: o.id.toString(), label: `${o.firstName} ${o.lastName}` }            
            }) 
  
    // set add mode to tre if id=0 otherwise move details of current horse into state
    if (+route.params['id'] === 0) {
        addMode.value=true      
    } else {     
        setStateFields()
    }
     
    // methods photo upload and form submits 
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

    // main form submit and redirect
    const addUpdateHorse = async () => {
     
      
        v$.value.$touch()
 
        if (v$.value.invalid) {            
            return
        }   
       
        if (addMode.value) {
            convertStateToFormDataFormat()  
        } else {
            convertStateToFormDataFormat(horse.value.id)  
        }       

        let responseFromApi=null, newRoute=null, msg=null, msgType=null, idForRoute=null, actioned=null

        if (addMode.value) {
            responseFromApi = await addHorse(horseFormData)  
            actioned='added'
        } else {
            responseFromApi = await updateHorse(horseFormData)
            actioned='updated'
        }

        if (responseFromApi) {

            if (typeof responseFromApi === 'object') {               

                idForRoute = addMode.value ? responseFromApi.id : horse.value.id

                if (photoState.uploadedPhoto && !responseFromApi.photoUploaded) {
                    msg= `${state.name} has been ${actioned} but the photo upload was not successful`
                    msgType=`warning`
                } else {
                    msg= `${state.name} has been ${actioned} successfully`
                    msgType=`success`
                }
                setMessage(msg, msgType)      
            } else {               
                setMessage(`${state.name} could not be ${actioned} at this time`)
                msgType=`error`
            } 
        } else {
            setMessage(`${state.name} could not be ${actioned} at this time`)
            msgType=`error`
        }   
      
        if (msgType === `error`) {
            newRoute = { name: `horseList`} 
        } else {
            newRoute = { name: `details`, params: { id: idForRoute }} 
        }
        router.push(newRoute)
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

        .btn-area {
            display: flex;
            justify-content: space-around;
            margin-top: 50px;

            .submit-btn {
                width: 160px;
            }
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

        .preview-photo {
           max-width: 150px;
           max-height: auto;
        }
    }

</style>