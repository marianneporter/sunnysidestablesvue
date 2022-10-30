import useDates from '@/composables/useDates.js'

export default function useValidators() {

    const { getAge } = useDates()

    const mustBeAtLeast1Owner = (value) => value.length !== 0 

    const noOfOwners = (value) => value.length > 0 && value.length <= 4

    const validSexAgeCombo = (value, siblings) => {
     
       let age = getAge(siblings.dob)    
       console.log(' age is ' + age)  
       if (age < 4 && (value === "Stallion" || value === "Mare" )) {
           return false
       }  
       return true
    }

    const validAgeSexCombo = (value, siblings) => {

        let age = getAge(value)
        console.log(' age is ' + age)  
        if (age < 4 && (siblings.sex === "Stallion" || siblings.sex === "Mare" )) {
            return false
        }
        return true
     }   

     return { mustBeAtLeast1Owner, noOfOwners, validSexAgeCombo, validAgeSexCombo }

}