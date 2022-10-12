import useDates from '@/composables/useDates'
import useAddUpdate from './useAddUpdate'
import useDB from '@/composables/useDB'

export default function useApiAdd() {  

   const { jsDateToYYYYMMDDFormat } = useDates()
   const { state } = useAddUpdate()
   const { addHorse } = useDB()

   const addHorseToApi = () => {
        let horseFormData = new FormData()
        horseFormData.append('name', state.name)
        horseFormData.append('colour', state.colour)
        horseFormData.append('sex', state.sex)      
        horseFormData.append('heightHands', state.height)
        horseFormData.append('dob', jsDateToYYYYMMDDFormat(state.dob))

        state.owners.forEach(ownerId => this.horseFormData.append('ownerIds', ownerId))

        if (state.uploadedPhoto) {
            horseFormData.append('imageFile', state.uploadedPhoto);
        }

        const addResult = addHorse(horseFormData)
   }     

    return { addHorseToApi }
}