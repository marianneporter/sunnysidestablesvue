import useDates from '@/composables/useDates'
import useAddUpdate from './useAddUpdate'

export default function useHandleFormDataObject() {  

    const { jsDateToYYYYMMDDFormat } = useDates()
    const { state } = useAddUpdate()

    let horseFormData = new FormData()   

    const convertStateToFormDataFormat = () => {
        console.log('in convertStateToFormDataFormat')
        horseFormData.append('name', state.name)
        horseFormData.append('colour', state.colour)
        horseFormData.append('sex', state.sex)      
        horseFormData.append('heightHands', state.height)
        horseFormData.append('dob', jsDateToYYYYMMDDFormat(state.dob))

        state.owners.forEach(ownerId => horseFormData.append('ownerIds', ownerId))

        horseFormData.append('imageFile', state.uploadedPhoto)

        let heightHands= horseFormData.get('heightHands')
        
    }  
    
    const resetHorseForm = () => {
        console.log('in reset horse form')
        horseFormData = new FormData()
    }


    return { convertStateToFormDataFormat, horseFormData, resetHorseForm }

}