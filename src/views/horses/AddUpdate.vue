<template>
    <div class="content">           
        <form novalidate @submit.prevent="addUpdateHorse()" enctype="multipart/form-data">
            <h3>{{addMode ? 'Add' : 'Update'}} Horse</h3>

            <add-update-form-fields  :addMode="addMode"
                                     :owners="owners" />

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

<script>
    //imports from vue
    import { onUnmounted, ref, onBeforeMount } from 'vue'
    import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'      
    //imported plug-ins
    import { createToaster } from "@meforma/vue-toaster";
    //imported composables   
    import useFormState from '@/composables/forms/add-update/useFormState' 
    import useSubmitForm from '@/composables/forms/add-update/useSubmitForm'
    import useHandleFormDataObject from '@/composables/forms/add-update/useHandleFormDataObject'
    //nested components
    import AddUpdateFormFields  from '@/components/AddUpdateFormFields.vue'
   

    export default {    
        name: 'AddUpdate',

        components: {
            AddUpdateFormFields
        },

        created() {  
            window.addEventListener('beforeunload', this.confirmLeave );
        },

        beforeDestroy() {          
            window.removeEventListener('beforeunload',  this.confirmLeave  )
        },

        unmounted() {
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
                    e.returnValue = null     // displaysn message  on its own displays message if together with above you get the message
                    return null
                }

                e.preventDefault()      // leaves anyway if on its own   if altogethere with return value you still get the message        
               
            },   
       
        },  

        setup() {
            const addMode = ref(false)
            const horse = ref({})

            const route = useRoute()
            const router = useRouter()

            const toaster = createToaster({ position: 'bottom' });              
            

            // destructure composables   
          
            const { state, photoState,
                    v$, clearState,
                    setStateFields, formSubmitted }   = useFormState()

            const { handleFormSubmit } = useSubmitForm()
          
            const { resetHorseForm }   = useHandleFormDataObject()

        
   
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

                if ((!v$.value.$anyDirty && !photoState.uploadedPhoto)) {
                    toaster.show(`Please amend form or click back button to return to list`,
                            {type: 'info',
                            position: 'top'}) 
                    return
                }  

                v$.value.$touch()

                if (v$.value.$invalid) {     
                    toaster.show(`One or more invalid fields.  Please correct and try again`,
                            {type: 'error',
                            position: 'top',
                            duration: 10000})    
                    return
                } 

                formSubmitted.value = true
        
                let { submitSuccess, idForRoute } = await handleFormSubmit(horse.value, addMode.value)   
        
                let newRoute
                if (submitSuccess) {
                    newRoute = { name: `details`, params: { id: idForRoute }}            
                } else {
                    newRoute = { name: `horseList`} 
                }       

                router.push(newRoute)
            }

            return {
                addMode, v$, owners, 
                addUpdateHorse, photoState,
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
          
            height:650px; 
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

</style>