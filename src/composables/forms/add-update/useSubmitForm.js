import useHandleFormDataObject from '@/composables/forms/add-update/useHandleFormDataObject'
import useFormState from '@/composables/forms/add-update/useFormState'
import useMessageForNextPage from  '@/composables/ui-state/useMessageForNextPage'
import useDB from '@/composables/useDB'

export default function useSubmitForm() { 
    const { convertStateToFormDataFormat, horseFormData } = useHandleFormDataObject()
    const { state, photoState } = useFormState()
    const { horse, addHorse, updateHorse } = useDB()
    const { setMessage } = useMessageForNextPage()

    const handleFormSubmit = async (addMode) => {

        if (addMode.value) {
            convertStateToFormDataFormat()  
        } else {
            convertStateToFormDataFormat(horse.value.id)  
        }       

        let responseFromApi=null, newRoute=null, msg=null, msgType=null, idForRoute=null, actioned=null

        if (addMode) {
            responseFromApi = await addHorse(horseFormData)  
            actioned='added'
        } else {
            responseFromApi = await updateHorse(horseFormData)
            actioned='updated'
        }

        if (responseFromApi) {

            if (typeof responseFromApi === 'object') {               

                idForRoute = addMode.value ? responseFromApi.id : horse.value.id

                if (photoState.uploadedPhoto && !responseFromApi.photoUploaded) {
                    msg= `${state.name} has been ${actioned} but the photo upload was not successful`
                    msgType=`warning`
                } else {
                    msg= `${state.name} has been ${actioned} successfully`
                    msgType=`success`
                }
                setMessage(msg, msgType)      
            } else {               
                setMessage(`${state.name} could not be ${actioned} at this time`)
                msgType=`error`
            } 
        } else {
            setMessage(`${state.name} could not be ${actioned} at this time`)
            msgType=`error`
        }   

        let success = msgType !== `error`
        return { success, idForRoute }
    } 

  
    return {
        handleFormSubmit
    }
}