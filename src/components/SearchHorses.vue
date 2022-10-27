<template>
    <div class="search-input">
        <input type="text" placeholder="search by horse's name" v-model="searchTerm" @keyup.enter="search()"> 
        <span class="icon">
            <button @click="resetSearch()"><font-awesome-icon icon="fa-solid fa-xmark" /></button>            
            <button @click="search()"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>                               
        </span>
    </div>   
 
</template>

<script setup>
    import useListState from "@/composables/ui-state/useListState.js"
    import { watch } from 'vue'

    const { searchTerm, clearListState } = useListState()

    const emit = defineEmits(['searchChanged'])

    const search = () =>  {
        if (!searchTerm.value) {
            return
        }
        clearListState()
        console.log('clearListState in search fired')
        emit('searchChanged', true)      
    }

    const resetSearch = (fromWatch=false) => { 
        if (!searchTerm.value && !fromWatch) {
            return
        }
        searchTerm.value=''
        clearListState()
        console.log('clearListState in resetSearch fired')
        emit('searchChanged', false)      
    }   

    watch(searchTerm, (newVal, oldVal) => {
        if (newVal === '') {
            resetSearch(true)
        }
    })

</script>

<style lang="scss" scoped>
    .search-input {
        display: flex;
        width: 225px;
        height: 40px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        
        input {
            height: inherit;
            border: none;
            padding-left: 3px;    
            
            &:focus {
                border: none;
                outline: none;
            }
        }

        .icon {           
            opacity: 0.5;

            button {
                display: inline-block;
                border: none;   
                padding: 12px 5px;
                margin-left: 7px;
                background-color: white;         
            } 
        }
    }

</style>