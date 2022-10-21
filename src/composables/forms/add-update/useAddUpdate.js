import useValidate from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from '@vuelidate/validators'
import { reactive, computed, ref} from 'vue'
import useDB from '@/composables/useDB'

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

export default function useAddUpdate() {  

    const { horse } = useDB()

    const horseIdForUpdate = ref(null)

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

    const setStateFields = () => {
 
        horseIdForUpdate.value = horse.value.id
        state.name             = horse.value.name
        state.colour           = horse.value.colour
        state.sex              = horse.value.sex
        state.dob              = new Date(horse.value.dob) 
        state.height           = horse.value.heightHands
        state.owners           = horse.value.owners.map(o => o.id)
        if (horse.value.imageUrl) {
            photoState.currentPhotoUrl = horse.value.imageUrl
        }  
     
    }  

    const v$ = useValidate(rules, state) 

    return { v$, state, photoState, clearState, setStateFields }

}