import { reactive, ref, computed, watch } from 'vue'

export default function useDates() {

    // const inputDateToDisplayFormat = computed(
    //     (stringDate) => {
    //         const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //         let date = new Date(stringDate)
    //         return date.toLocaleDateString('en-GB', options)      
    //     }
    // ) 

  // const elephant = () => "elephant"

    
    const inputDateToDisplayFormat = (inDate) => {    
        const options = {  year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(inDate)
        return date.toLocaleDateString('en-GB', options)  
    }

    return {
        inputDateToDisplayFormat
    }
}