import { reactive, ref, computed, watch } from 'vue'

export default function useDates() {

    const msToYears = (ms) => Math.floor(ms / 31536000000) 

    const getAge = (dob) => {
        let today = new Date();
        let msDiff = today.getTime() - dob.getTime();
        return msToYears(msDiff);
    }
    
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

    const jsDateToYYYYMMDDFormat = (inDate) => {
        
        return `${inDate.getFullYear()}-${inDate.getMonth()+1}-${inDate.getDate()}`
    }
 
    return {
        inputDateToDisplayFormat, minValidDOB,
         jsDateToYYYYMMDDFormat, getAge
    }
}