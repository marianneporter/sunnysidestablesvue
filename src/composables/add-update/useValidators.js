import useDates from '@/composables/utility/useDates.js'

export default function useValidators() {

    const { getAge } = useDates()

    const mustBeAtLeast1Owner = (value) => value.length !== 0 

    const noOfOwners = (value) => value.length > 0 && value.length <= 4

    //check that the sex entered is compatible with dob if this has been entered
    const validSexAgeCombo = (sex, siblings) => {
 
        if (!siblings.dob) {
            return true
        }   
        
        return validSexDob(siblings.dob, sex)
     
    }

    // check that dob entered is compatible with the sex if this has been entered
    const validAgeSexCombo = (dob, siblings) => {

        if (!siblings.sex) {  
            return true
        }

        return validSexDob(dob, siblings.sex) 
    }

    // helper method for dob/sex combination validators
    const validSexDob = (dob, sex) => {    

        if (sex === 'Gelding') {          
            return true
        }

        let age = getAge(dob)  

        if (age < 4) {
            if  (sex === "Colt" || sex === "Filly") {
                return true 
            }
        } else  {      // age >= 4
            if (sex === "Stallion" || sex === "Mare") {
                return true
            }       
        }

        return false;
    }

    return { mustBeAtLeast1Owner, noOfOwners, validSexAgeCombo, validAgeSexCombo }

}