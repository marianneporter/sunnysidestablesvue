<template>
    <div class="content">           
        <form novalidate @submit.prevent="addUpdateHorse()" enctype="multipart/form-data">
            <h3>{{addMode ? 'Add' : 'Update'}} Horse</h3>

            <HorseAddUpdateInputs :add-mode="addMode"
                                  :owners="owners" />

            <div class="btn-area">
                <router-link :to="{ name: 'horseList'}" class="btn btn-secondary back-btn btn-full-mob">
                             <font-awesome-icon icon="fa-solid fa-arrow-left" />&nbsp;Back to List
                </router-link>
                <button type="submit"
                        class="btn btn-success btn-full-mob submit-btn"> {{addMode ? 'Add' : 'Update'}} Horse
                </button>                  
            </div>  
        </form>   
    </div>
</template>

<script>

    //imports from vue
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'      
    //imported plug-ins
    import { createToaster } from "@meforma/vue-toaster";
    //imported composables   
    import useFormState from '@/composables/add-update/useFormState' 
    import useFormatDataAndSubmit from '@/composables/add-update/useFormatDataAndSubmit' 
    import useMessageForNextPage from  '@/composables/ui-state/useMessageForNextPage'  
    //nested components
    import HorseAddUpdateInputs  from '@/components/HorseAddUpdateInputs.vue'   

    export default {    
        name: 'AddUpdate',

        components: {
            HorseAddUpdateInputs
        },        

        created() {                         
            window.addEventListener('beforeunload', this.confirmLeave );
        },

        unmounted() {  
            window.removeEventListener('beforeunload',  this.confirmLeave  )
            this.resetHorseForm()
            this.clearState()
        },

        beforeRouteLeave() { 

            if ( this.formSubmitted || (!this.v$.$anyDirty && !this.photoState.uploadedPhoto)) {
                return
            }

            const answer = window.confirm(
                'You have unsaved changes - Are you sure you would like to leave this page?'
            )
            // cancel the navigation and stay on the same page
            if (answer) {            
                window.removeEventListener('beforeunload',  this.confirmLeave )              
            } else {              
                return false
            }
        },


        methods: {

            confirmLeave(e) {              

                if (this.v$.$anyDirty || this.photoState.uploadedPhoto) {
                    e.returnValue = null  
                    return null
                }

                e.preventDefault()          
               
            },   
       
        },  

        setup() {
            const addMode = ref(false)
            const horse = ref({})
            const route = useRoute()
            const router = useRouter()

            const toaster = createToaster({ position: 'bottom' });  

            const { setMessage } = useMessageForNextPage()  
          
            const { state, photoState,
                    v$, clearState,
                    setStateFields, formSubmitted }   = useFormState()

            const { handleFormSubmit, resetHorseForm } = useFormatDataAndSubmit()
    
           //set add mode to true if id=0 otherwise move details of current horse into state
            if (+route.params['id'] === 0) {
                addMode.value=true      
            } else {    
                horse.value = route.meta['horse']
                setStateFields(horse.value)
            }  
            
            const owners = route.meta['owners']
        
           //  form submit and redirect
            const addUpdateHorse = async () => {     

                // if ((!v$.value.$anyDirty && !photoState.uploadedPhoto)) {
                //     toaster.show(`Please amend form or click back button to return to list`,
                //             {type: 'info',
                //             position: 'top'}) 
                //     return
                // }  

                // if ( addMode ) {
                //     if ((!v$.value.$anyDirty && !photoState.uploadedPhoto)) {
                //         toaster.show(`Please amend form or click back button to return to list`,
                //                 {type: 'info',
                //                 position: 'top'}) 
                //         return
                //     }
                // }  else {   //update mode
                //     if (v$.value.$anyDirty) {
                //         continue
                //     } else if (photoState.uploadedPhoto) {
                //         continue
                //     } else if (photoState.currentPhotoUrl && !photoState.uploadedPhoto) {
                //         continue
                //     } else {
                //         toaster.show(`Please amend form or click back button to return to list`,
                //                 {type: 'info',
                //                 position: 'top'}) 
                //         return                        
                //     }
                // }  
                
                console.log('current photo url ' + photoState.currentPhotoUrl )
                console.log('photoState.uploadedPhoto ' + photoState.uploadedPhoto)
                console.log(addMode.value)

                if ( addMode.value ) {
                     console.log('in horseaddupdate view add section')
                    if ((!v$.value.$anyDirty && !photoState.uploadedPhoto)) {
                        toaster.show(`Please amend form or click back button to return to list`,
                                {type: 'info',
                                position: 'top'}) 
                        return
                    }
                }  else {   //update mode
                    console.log('in horseaddupdate view update section')
                    console.log('v$.value.$anyDirty ' + v$.value.$anyDirty )
                    console.log('photoState.uploadedPhoto ' + photoState.uploadedPhoto)
                    console.log('photoState.currentPhotoUrl ' + photoState.currentPhotoUrl)

                    if (!v$.value.$anyDirty) {
                        console.log('not anydirty is ' + !v$.value.$anyDirty)
                    }

                    if (photoState.currentPhotoUrl == null) {
                        console.log('current photo url = null is true ')
                    }

                    if (photoState.uploadedPhoto == null) {
                        console.log('uploadedPhoto = null is true ')
                    }

                    if ( !v$.value.$anyDirty && !photoState.uploadedPhoto && !photoState.photoReset) {
                        toaster.show(`Please amend form or click back button to return to list`,
                                {type: 'info',
                                position: 'top'}) 
                        return                       
                    }
                }
                console.log('after the big if')



                //         && (!photoState.uploadedPhoto && photoState.currentPhotoUrl)|| photoState.uploadedPhoto)
                    
                //     {
                //         continue
                //     } else if (photoState.uploadedPhoto) {
                //         continue
                //     } else if (photoState.currentPhotoUrl && !photoState.uploadedPhoto) {
                //         continue
                //     } else {
                //         toaster.show(`Please amend form or click back button to return to list`,
                //                 {type: 'info',
                //                 position: 'top'}) 
                //         return                        
                //     }
                // }     
                v$.value.$touch()

                if (v$.value.$invalid) {     
                    toaster.show(`One or more invalid fields.  Please correct and try again`,
                            {type: 'error',
                            position: 'top',
                            duration: 10000})    
                    return
                } 

                formSubmitted.value = true

                let newRoute
                try {
                    let { submitSuccess, idForRoute } = await handleFormSubmit(horse.value, addMode.value)  
                    if (submitSuccess) {
                        newRoute = { name: `horse-details`, params: { id: idForRoute }}            
                    } else {
                        newRoute = { name: `horseList`} 
                    }                      
                }
                catch(err) {
                    setMessage('Something went wrong. Please try later', 'error')                              
                    newRoute = { name: `home`} 
                }    
                
                router.push(newRoute)

            }

            return {
                addMode, v$, owners, 
                addUpdateHorse, state, photoState,
                clearState, resetHorseForm,
                formSubmitted
            }
       }
    }

</script>



<style lang="scss" scoped>
  
    @import "@/assets/scss/global.scss";    
 
    .content {
        display: flex;
        justify-content: center;
        align-items: center;      
    }

    form {
        background-color: white;       
        padding: 40px 30px;
        color: #404040;     
    }
   
    @media screen and (max-width: 767px),
                      (min-width: 768px) and (max-height: 699px)  {
        .content {
            @include mobile-background;
        }

        form {
            width: 95%;
            max-width: 400px;
            margin: 16px auto;
        }

        .btn-area  {
            margin-top: 10px;
          

            & > * {
                width: 95%;
                margin: 0 auto;
              
            }

            .submit-btn {
                margin-top: 5px;                
            }
        }
    }


    @media screen and (min-width: 768px) and (min-height: 700px) {
        .content {
            @include desktop-background($formBackgroundImage, true, 0.75);  
        } 

        form {
            margin: 0 auto;
            width: 600px;    
        }

        .btn-area {
            display: flex;
            justify-content: space-around;
            border-top: 0.5px solid #BEBEBE;
            padding-top: 20px;                  
            column-gap: 20px;
            margin-top: 35px;

            .submit-btn, .back-btn  {            
                max-width: 650px;
                width: 180px;
                height: 50px; 
                margin-top: 0;           
            }
        }
    }

</style>