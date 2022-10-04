import { reactive, computed, toRaw } from 'vue'

export default function useAddUpdate() { 

    const state= reactive({name: null,
        colour: null, 
        sex: null,
        colour: null,
        height: null,
        owners: []})

    return { state }
}