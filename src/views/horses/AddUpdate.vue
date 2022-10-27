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
                 </div>  
                 <div class="form-element p40-width">
                    <label>Colour:</label>
                    <Multiselect
                        v-model="v$.colour.$model"
                        :label="v$.colour.$model"
                        :value="v$.colour.$model"
                        :options="colours"
                        :classes="{clear: 'multiselect-clear',
                                   clearIcon: 'multiselect-clear-icon' }" />  
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
                        :options="heights"
                       />   
                    <ValidationMsg :model="v$.height"/>         
                </div>  

                <div class="form-element owners-select" id="test">
                    <label>Owners:</label>
                    <Multiselect
                        v-model="v$.owners.$model"
                        mode="tags"
                        :close-on-select="false"
                        class="multiselect-owners"
                        :options="ownersForSelect" />
                    <ValidationMsg :model="v$.owners"/>     
                </div>   

                <photo-upload :addMode="addMode" />         

            </div>             

            <div class="btn-area">
                <router-link :to="{ name: 'horseList'}" class="btn btn-secondary btn-full-mob">
                             <font-awesome-icon icon="fa-solid fa-arrow-left" />&nbsp;Back to List
                </router-link>
                <button type="submit"
                        class="btn btn-success btn-full-mob submit-btn"> {{addMode ? 'Add' : 'Update'}} Horse
                </button>                  
            </div>  
        
            <div><pre>invalid: {{ v$.$invalid }}</pre></div>
            <div><pre>dirty: {{ v$.$dirty }}</pre></div>
            <div><pre>anyDirty: {{ v$.$anyDirty }}</pre></div>
        </form>   

    </div>


</template>

<script setup>
    //imports from vue
    import { onUnmounted, ref, onBeforeMount } from 'vue'
    import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'      

    //imported plug-ins
    import Multiselect from '@vueform/multiselect'
    import Datepicker from '@vuepic/vue-datepicker';
    import { createToaster } from "@meforma/vue-toaster";
    import '@vuepic/vue-datepicker/dist/main.css';
    import PhotoUpload from '@/components/PhotoUpload.vue'
    import ValidationMsg from '@/components/ValidationMsg.vue'

    //imported composables
    import useSelectOptions from '@/composables/forms/add-update/useSelectOptions.js'
    import useFormState from '@/composables/forms/add-update/useFormState' 
    import useSubmitForm from '@/composables/forms/add-update/useSubmitForm'
    import useHandleFormDataObject from '@/composables/forms/add-update/useHandleFormDataObject'
    import useDates from '@/composables/useDates'

    const addMode = ref(false)

    const route = useRoute()
    const router = useRouter()

    const toaster = createToaster({ position: 'bottom' });

    const owners = route.meta['owners']

    // destructure composables   
    const { sexes, colours, heights } = useSelectOptions()
    const { state, photoState,
            v$, clearState,
            setStateFields, formSubmitted }   = useFormState()
    const { handleFormSubmit } = useSubmitForm()
    const { minValidDOB }      = useDates()  
    const { resetHorseForm }   = useHandleFormDataObject()


    onBeforeMount(() => {

        window.addEventListener('beforeunload', (event) => {     
 
            if (!v$.value.$anyDirty && !photoState.uploadedPhoto) 
                return ''   

            event.preventDefault()                
            event.returnValue = ''
            return ''
        })

    })       

    onUnmounted(() => {  
        resetHorseForm()
        clearState()
    })

    onBeforeRouteLeave((to, from) => {

        if ( formSubmitted.value || (!v$.value.$anyDirty && !photoState.uploadedPhoto)) {
            return
        }

        const answer = window.confirm(
            'You have unsaved changes - Are you sure you would like to cancel'
        )
        // cancel the navigation and stay on the same page
        if (!answer) return false
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
 
    //  form submit and redirect
    const addUpdateHorse = async () => {     

        if ((!v$.value.$anyDirty && !photoState.uploadedPhoto)) {
            console.log('in toaster condition')
            toaster.show(`Please amend form or click on back to return to list`,
                    {type: 'info',
                     position: 'top'}) 
            return
        }  

        v$.value.$touch()
 
        if (v$.value.invalid) {            
            return
        } 

        console.log('nydirty ' + v$.value.$anyDirty);
        console.log('photoState.uploadedPhoto' + photoState.uploadedPhoto)

        formSubmitted.value = true
   
        let { submitSuccess, idForRoute } = await handleFormSubmit(addMode.value)   
 
        let newRoute
        if (submitSuccess) {
            newRoute = { name: `details`, params: { id: idForRoute }}            
        } else {
            newRoute = { name: `horseList`} 
        }       

        router.push(newRoute)
    }
 
</script>


<style src="@vueform/multiselect/themes/default.css"></style>


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
            font-size: 18px; 
        } 


        .p40-width {
            min-width: 40%;            
        }

        .p75-width {
            min-width: 75%;
        }
    }
    
    .multiselect {
        min-width: 225px;
    }

    .owners-select {

        min-width: 230px;
 
        .multiselect-owners {
            --ms-tag-bg: #f5f5f5;
            --ms-tag-color: #383838;
            --ms-ring-width: 0;
            --ms-tag-font-weight: 400;          
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

        .name-input {
            width: 100%;
            height: 35px;
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

            .form-body {
                display: flex;
                flex-wrap: wrap;                
                column-gap: 40px;
            }  
        }

        .owners-select {
            width: 200px;            
        }

        .name-input { 
            width: 200px;
            height: 40px;
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

<style lang="scss">

    .multiselect-clear {
        position: relative;

        .multiselect-clear-icon {
            position: absolute; 
            top: 10px;
            right: 10px;            
        }
    }

    .owners-select {        
        .multiselect-clear {
            position: static; 
        }
    }

 </style>