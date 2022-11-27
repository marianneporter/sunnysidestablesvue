import useFormState from '@/composables/add-update/useFormState'
import useMessageForNextPage from  '@/composables/ui-state/useMessageForNextPage'
import useDB from '@/composables/database/useDB'
import useDates from '@/composables/utility/useDates'

export default function useSubmitForm() { 
  
    const { state, photoState, formSubmitted } = useFormState()
    const { jsDateToYYYYMMDDFormat } = useDates()
    const { addHorse, updateHorse } = useDB()
    const { setMessage } = useMessageForNextPage()

    let horseFormData = new FormData()   

    const convertStateToFormDataFormat = (id) => {
    
        if (id) {            
            horseFormData.append('id', id)
        }

        horseFormData.append('name', state.name)
        horseFormData.append('colour', state.colour)
        horseFormData.append('sex', state.sex)      
        horseFormData.append('heightHands', state.height)
       
        horseFormData.append('dob', jsDateToYYYYMMDDFormat(state.dob))

        state.owners.forEach(ownerId => horseFormData.append('ownerIds', ownerId))

       
        if (photoState.uploadedPhoto) {          
            horseFormData.append('imageFile', photoState.uploadedPhoto)
        }

        let heightHands= horseFormData.get('heightHands')
        
    }  
    
    const resetHorseForm = () => { 
        horseFormData = new FormData()
    }

    const handleFormSubmit = async (horse, addMode) => {      

        if (addMode) {
            convertStateToFormDataFormat()  
        } else {
            convertStateToFormDataFormat(horse.id)  
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

                idForRoute = addMode ? responseFromApi.id : horse.id

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

        let submitSuccess = msgType !== `error`
                
        return { submitSuccess, idForRoute }
    } 

  
    return {
          resetHorseForm, handleFormSubmit 
    }
}