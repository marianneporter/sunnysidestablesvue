import useDates from '@/composables/useDates'
import useAddUpdate from './useAddUpdate'

export default function usePrepareApiRequest() {  

    const { jsDateToYYYYMMDDFormat } = useDates()
    const { state } = useAddUpdate()
   

    console.log('state is')
    console.log(state)

    const formatFormData = async () => {

        let horseFormData = new FormData()
        horseFormData.append('name', state.name)
        horseFormData.append('colour', state.colour)
        horseFormData.append('sex', state.sex)      
        horseFormData.append('heightHands', state.height)
        horseFormData.append('dob', jsDateToYYYYMMDDFormat(state.dob))

        state.owners.forEach(ownerId => horseFormData.append('ownerIds', ownerId))

        horseFormData.append('imageFile', state.uploadedPhoto)

        return horseFormData

    //    const addResult = addHorse(horseFormData)
        
    }     

    return { addHorseToApi }

}