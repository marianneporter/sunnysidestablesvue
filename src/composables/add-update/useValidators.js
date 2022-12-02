import useDates from '@/composables/utility/useDates.js'

export default function useValidators() {

    const { getAge } = useDates()

    const noOfOwners = (value) => value.length > 0 && value.length <= 4

    const validNameChars = (value) =>  /^[A-Za-z\s]*$/.test(value)

    const validSexDobCombo = (sex, siblings) => !siblings.dob || validSexDob(siblings.dob, sex)

    const validDobSexCombo = (dob, siblings) => !siblings.sex || validSexDob(dob, siblings.sex) 

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

    return { validNameChars,          
             noOfOwners,
             validSexDobCombo,
             validDobSexCombo
    }

}