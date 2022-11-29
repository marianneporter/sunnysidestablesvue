/*
    Maintains state for the add update form, including inputs photo and validation
*/

import useValidate from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from '@vuelidate/validators'
import { reactive, computed, ref} from 'vue'
import useValidators from '@/composables/add-update/useValidators.js'

const state = reactive({
    name: null,
    colour: null, 
    sex: null,
    height: null,
    dob: null,
    owners: []}) 

const photoState = reactive ( {
    uploadedPhoto: null,
    currentPhotoUrl: null
} )

export default function useFormState() {  
     
    const horseIdForUpdate = ref(null) 
    const formSubmitted = ref(false)

    const { mustBeAtLeast1Owner, noOfOwners, validSexAgeCombo, validAgeSexCombo } = useValidators()
   
    const rules = computed(() => {
        return {
            name: 
            {
                required:  helpers.withMessage(`Please enter horse's name`, required),
                minLength: helpers.withMessage(`Horse's name must be at least 3 characters`, minLength(3)),
                maxLength: helpers.withMessage(`Maximum length for horse's name is 20 characters`, maxLength(20))
            },
            colour: { required: helpers.withMessage(`Please enter colour of horse`, required) },              
            sex: 
            {
                required: helpers.withMessage(`Please enter sex of horse`, required),
                validSexAgeCombo: helpers.withMessage(`Invalid sex / dob combination `, validSexAgeCombo)
            },
            height: { required: helpers.withMessage(`Please enter horse's height in hands`, required)  },
            dob:  
            {
                required: helpers.withMessage(`Please enter horse's date of birth`, required),          
                validAgeSexCombo: helpers.withMessage(`Invalid sex / dob combination `, validAgeSexCombo) },
            owners: { noOfOwners: helpers.withMessage(`Please select between 1 and 4 owners`, noOfOwners)}          
        }
    })

    const clearState = () => {
        state.name   = null
        state.colour = null
        state.sex    = null
        state.height = null
        state.dob    = null
        state.owners = []
        photoState.currentPhotoUrl = null
        photoState.uploadedPhoto = null        
    }

    const setStateFields = (horse) => {
 
        horseIdForUpdate.value = horse.id
        state.name             = horse.name
        state.colour           = horse.colour
        state.sex              = horse.sex
        state.dob              = new Date(horse.dob) 
        state.height           = horse.heightHands
        state.owners           = horse.owners.map(o => o.id)
        if (horse.imageUrl) {
            photoState.currentPhotoUrl = horse.imageUrl
        }  
     
    }  

    const v$ = useValidate(rules, state) 

    return { v$, state, photoState, clearState, setStateFields, formSubmitted }

}