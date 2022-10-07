import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

import { reactive, computed, toRaw } from 'vue'

export default function useAddUpdate() { 

    const state= reactive({
        name: null,
        colour: null, 
        sex: null,
        height: null,
        dob: null,
        owners: [],
        uploadedPhoto: null})

        const rules = computed(() => {
            return {
                name: 
                {
                       required: helpers.withMessage(`Please enter horse's name`, required)
                },
                colour: { required: helpers.withMessage(`Please enter colour of horse`, required) },              
                sex:    { required:  helpers.withMessage(`Please enter sex of horse`, required) },
                height: { required: helpers.withMessage(`Please enter horse's height in hands`, required)  },
                dob:    { required: helpers.withMessage(`Please enter horse's date of birth`, required) },
                owners: {},
                uploadedPhoto: {}
            }
        })

        const v$ = useValidate(rules, state) 

    return { v$, state }
}