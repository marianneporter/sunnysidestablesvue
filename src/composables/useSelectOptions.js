import { reactive } from 'vue'

export default function useSelectOptions() { 
     
    const sexes =['Gelding', 'Mare', 'Colt', 'Filly', 'Stallion']
  
    const colours = [
        'Brown', 'Black', 'Bay', 'Grey', 'Chestnut', 'Piebald',
        'Skewbald', 'Dun', 'Roan', 'Spotted', 'Palomino'
    ]    
    
    const heights = [
        '10.0', '10.1', '10.2', '10.3',
        '11.0', '11.1', '11.2', '11.3',
        '12.0', '12.1', '12.2', '12.3',
        '13.0', '13.1', '13.2', '13.3',
        '14.0', '14.1', '14.2', '14.3',
        '15.0', '15.1', '15.2', '15.3',
        '16.0', '16.1', '16.2', '16.3',
        '17.0', '17.1', '17.2', '17.3',
        '18.0', '18.1', '18.2', '18.3'
    ]

    const owners = [
        { value: '1', label: 'Batman Smith' },
        { value: '2', label: 'Robin Jones' },
        { value: '3', label: 'Joker Green' },
        { value: '4', label: 'Tom Black'},
        { value: '5', label: 'Dick Whittington'}
    ]
  
    return {
       sexes, colours, heights, owners
    }
}