<template>
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
        

</template>

<script setup>
    
    //imported composables
    import useFormState from '@/composables/forms/add-update/useFormState.js'
    import useSelectOptions from '@/composables/forms/add-update/useSelectOptions.js'
    import useDates from '@/composables/useDates'

    //imported plug ins 
    import Multiselect from '@vueform/multiselect'
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    //nested components
    import PhotoUpload from '@/components/PhotoUpload.vue'
    import ValidationMsg from '@/components/ValidationMsg.vue'

    const { sexes, colours, heights } = useSelectOptions()
    const { v$, photoState } = useFormState()
    const { minValidDOB } = useDates()  

    const props = defineProps(['addMode', 'owners'])

    //ui setup for owners select
    const ownersForSelect =
        props.owners.map((o)=> {           
            return {value: o.id.toString(), label: `${o.firstName} ${o.lastName}` }            
        }) 

</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss";  

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

        .name-input {
            width: 100%;
            height: 35px;
        }
    }

    @media screen and (min-width: 992px) {
        .form-body {
            display: flex;
            flex-wrap: wrap;                
            column-gap: 40px;
        }   
        
        .owners-select {
            width: 200px;            
        }

        .name-input { 
            width: 200px;
            height: 40px;
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
            background-color: pink;
 
        }
    } 

 </style>