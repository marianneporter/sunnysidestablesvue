<template>
    <div class="form-body">
        <div class="form-element name-element">
            <label>Name of horse:</label>
            <input type="text" class="name-input p75-width" 
                    v-model="v$.name.$model">  
            
            <div  v-tooltip="{ content: nameTooltip, html: true }"><ValidationMsg :model="v$.name"/></div>    
                     
        </div>               
        <div class="form-element dob-element">
            <label>Date of Birth:</label>
            <div style="position: relative">
                <Datepicker v-model="v$.dob.$model"
                                format="dd MMM yyyy"
                                :clearable="false"                     
                                :value="v$.dob.$model"
                                :startDate="v$.dob.$model"
                                :maxDate="new Date()"
                                :minDate="minValidDOB()" />   
                <font-awesome-icon class="calendar-icon" icon="fa-solid fa-calendar-days" />      
            </div>
      
            
            <div v-tooltip="{ content: ageDobTooltip, html: true }"><ValidationMsg :model="v$.dob"/></div>           
        </div>  
        <div class="form-element">
            <label>Colour:</label>
            <Multiselect
                v-model="v$.colour.$model"
                :label="v$.colour.$model"
                :value="v$.colour.$model"
                :options="colours"
                :canClear="false"
                :classes="{ clear: 'multiselect-clear',
                            clearIcon: 'multiselect-clear-icon' }" />  
            <ValidationMsg :model="v$.colour"/>                     
        </div>   

        <div class="form-element sex-element">
            <label>Sex:</label>   
            <Multiselect
                v-model="v$.sex.$model"
                :label="v$.sex.$model"
                :value="v$.sex.$model"
                :options="sexes"
                :canClear="false" />            
            <div v-tooltip="{ content: ageDobTooltip, html: true }" ><ValidationMsg :model="v$.sex"/></div>     
        </div>  

        <div class="form-element">
            <label>Height(hands):</label>
            <Multiselect
                v-model="v$.height.$model"
                :label="v$.height.$model"
                :value="v$.height.$model"
                :options="heights"
                :canClear="false"
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
                :canClear="false"
                :options="ownersForSelect" />
            <ValidationMsg :model="v$.owners"/>     
        </div>   

        <HorseAddUpdateInputsPhotoUpload :add-mode="addMode" />             

    </div>   
        
    
</template>

<script setup>
    import { ref } from 'vue'
    
    //imported composables
    import useFormState from '@/composables/add-update/useFormState.js'
    import useSelectOptions from '@/composables/add-update/useSelectOptions.js'
    import useDates from '@/composables/utility/useDates'
    //npm imports
    import Multiselect from '@vueform/multiselect'
    import Datepicker from '@vuepic/vue-datepicker';  
    import '@vuepic/vue-datepicker/dist/main.css';
    import 'floating-vue/dist/style.css'
   
    //nested components
    import HorseAddUpdateInputsPhotoUpload from '@/components/HorseAddUpdateInputsPhotoUpload'
    import ValidationMsg from '@/components/ValidationMsg.vue'
    const { sexes, colours, heights } = useSelectOptions()
    const { v$, photoState } = useFormState()
    const { minValidDOB } = useDates()  
    const props = defineProps({
        addMode: {
            type: Boolean,
            required: true
        },  
        owners: {
            type: Array,
            required: true
        }       
    }); 
    //ui setup for owners select
    const ownersForSelect =
        props.owners.map((o)=> {           
            return {value: o.id.toString(), label: `${o.firstName} ${o.lastName}` }            
        }) 
 
    const ageDobTooltip = ref('<p>Colts & Fillys are < 4 years,</p>'
                            + '<p>Mares and Stallions >= 4 years,</p>'
                            + '<p> Geldings can be any age</p>')
    const nameTooltip = ref('<p>Name mus3 characters</p>'
                          + '<p>and contain letters and spaces only</p>')
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss";  
    
    .form-element {
        margin-top: 20px;  
        & *:not(.multiselect) {
            display: block;    
        }
        min-width: 225px;
    }

    .name-input {      
        border: 1px solid #D3D3D3;
        border-radius: 3px;
        padding: 5px;
        font-size: 16px; 
        color: #383838;
        width: 100%;
        height: 35px;       
    } 

    .owners-select {
 
        .multiselect-owners {
            --ms-tag-bg: #f5f5f5;
            --ms-tag-color: #383838;
            --ms-ring-width: 0;
            --ms-tag-font-weight: 400;          
        }  
    } 
    
    @media screen and (min-width: 768px) and (min-height: 700px) {
        .form-body {
            display: flex;
            flex-wrap: wrap;                
            column-gap: 40px;
        }   

        .form-element {
            width: 225px;
        }

        .name-element {
            min-width: 500px;
        }

        .name-input {
            width: 300px;
            height: 40px;
        }
    }
</style>


<style lang="scss">   // non scoped scss relating to custom styling
                      // form elements nested components from packages
   
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

    .dob-element {
        input{           
            padding: 8px 8px;   
            position: relative;
        } 

        .dp__input_icon {           
            display: none;            
        }

        .calendar-icon {
           position: absolute;
           top: 12px;
           right: 12px;
           color: #808080;
           pointer-events: none;
        }
    }

 
    .tooltip {
        max-width: 100px !important;
    }


 </style>