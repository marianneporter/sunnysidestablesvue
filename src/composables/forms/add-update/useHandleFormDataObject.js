import useDates from '@/composables/useDates'
import useAddUpdate from './useAddUpdate'

export default function useHandleFormDataObject() {  

    const { jsDateToYYYYMMDDFormat } = useDates()
    const { state, photoState } = useAddUpdate()

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

    return { convertStateToFormDataFormat, horseFormData, resetHorseForm }

}