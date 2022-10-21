import { reactive, ref, computed, watch } from 'vue'

export default function useDates() {
    
    const inputDateToDisplayFormat = (inDate) => {    
        const options = {  year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(inDate)
        return date.toLocaleDateString('en-GB', options)  
    }

    const minValidDOB = () => {
        const today = new Date() 
        let yyyy = today.getFullYear() - 30;        
        return new Date(yyyy, 0, 1)
    }

    const jsDateToYYYYMMDDFormat = (inDate) => inDate.toISOString().split('T')[0] 
 
    return {
        inputDateToDisplayFormat, minValidDOB, jsDateToYYYYMMDDFormat
    }
}