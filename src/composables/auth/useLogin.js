/************************ Login data and validation *************************** */
import useValidate from '@vuelidate/core'
import { required, email, minLength,  helpers } from '@vuelidate/validators'
import { reactive, computed, toRaw } from 'vue'

export default function useLogin() {
 
    const state= reactive({email: null, password: null})

    const rules = computed(() => {
        return {
            email: {
                required: helpers.withMessage('Please enter email', required),
                email: helpers.withMessage('Please enter a valid email', email)
            },
            password: { 
                required: helpers.withMessage('Please enter password', required), 
                minLength: helpers.withMessage('Password must have minimum length of 8 characters', minLength(8))
            }
        }
    })

    const getUserCreds = () => toRaw(state)

    const v$ = useValidate(rules, state) 

    return { v$, state, getUserCreds }

}