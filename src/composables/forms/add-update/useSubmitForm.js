import { reactive } from 'vue'

export default function useSubmitForm() { 
    const handleFormSubmit = (addMode) => {
        console.log('in logAddMode')
        console.log(addMode.value)

    } 

  
    return {
       logAddMode
    }
}