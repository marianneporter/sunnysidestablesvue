import useValidate from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from '@vuelidate/validators'
import { reactive, computed, toRaw } from 'vue'

const state = reactive({
    name: null,
    colour: null, 
    sex: null,
    height: null,
    dob: null,
    owners: [],
    uploadedPhoto: null}) 

export default function useAddUpdate() {  

    const mustBeAtLeast1Owner = (value) => value.length !== 0 
    const noOfOwners = (value) => value.length > 0 && value.length <= 4

    const rules = computed(() => {
        return {
            name: 
            {
                required:  helpers.withMessage(`Please enter horse's name`, required),
                minLength: helpers.withMessage(`Horse's name must be at least 3 characters`, minLength(3)),
                maxLength: helpers.withMessage(`Maximum length for horse's name is 20 characters`, maxLength(20))
            },
            colour: { required: helpers.withMessage(`Please enter colour of horse`, required) },              
            sex:    { required: helpers.withMessage(`Please enter sex of horse`, required) },
            height: { required: helpers.withMessage(`Please enter horse's height in hands`, required)  },
            dob:    { required: helpers.withMessage(`Please enter horse's date of birth`, required) },
            owners: { noOfOwners: helpers.withMessage(`Please select between 1 and 4 owners`, noOfOwners)},
            uploadedPhoto: {}
        }
    })

    const clearState = () => {
        state.name   = null
        state.colour = null
        state.sex    = null
        state.height = null
        state.dob    = null
        state.owners = []
        state.uploadedPhoto = null
    }  

    const v$ = useValidate(rules, state, clearState) 

    return { v$, state, clearState }
}