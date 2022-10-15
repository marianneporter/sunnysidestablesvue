import useDates from '@/composables/useDates'
import useAddUpdate from './useAddUpdate'

export default function useFormatDataForApi() {  

    const { jsDateToYYYYMMDDFormat } = useDates()

    const { state } = useAddUpdate()
    const horseFormData = new FormData()   

    console.log('state is')
    console.log(state)

    const formatFormData = async () => {
    
        horseFormData.append('name', state.name)
        horseFormData.append('colour', state.colour)
        horseFormData.append('sex', state.sex)      
        horseFormData.append('heightHands', state.height)
        horseFormData.append('dob', jsDateToYYYYMMDDFormat(state.dob))

        state.owners.forEach(ownerId => horseFormData.append('ownerIds', ownerId))

        horseFormData.append('imageFile', state.uploadedPhoto)

        let heightHands= horseFormData.get('heightHands')
        console.log('in formatFormData heightHands in form is '  )
        console.log(heightHands)

      

    //    const addResult = addHorse(horseFormData)
        
    }   
    
    

    return { formatFormData, horseFormData }

}