<template>
    <div class="search-input">
        <input type="text" placeholder="search by horse name" v-model="searchTerm"   @keyup.enter="search()">      
        <button :class="{ invisible: searchTerm==''}"
                @click="resetSearch()"><font-awesome-icon icon="fa-solid fa-xmark" /></button>            
        <button @click="search()"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
    </div>   
 
</template>

<script setup>
    import useListState from "@/composables/ui-state/useListState.js"
    import { watch } from 'vue'

    const { searchTerm } = useListState()

    const emit = defineEmits(['searchChanged'])

    const search = () =>  {
        if (!searchTerm.value) {
            return
        } 
        emit('searchChanged')      
    }

    const resetSearch = () =>  searchTerm.value=''   

    watch(searchTerm, (newVal, oldVal) => {
        // initiates search reset when searchTerm becomes equal to ''
        if (newVal === '') {
            emit('searchChanged')   
        }
    })

</script>

<style lang="scss" scoped>

     @import "@/assets/scss/global.scss"; 

    .search-input {
        display: flex;
        width: 230px;
        height: 40px;           
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);       
        
        input {
            height: inherit;
            border: none;
            padding-left:10px;
     
         
          
            flex: 1 0 0;    
                  
            &:focus {
                border: none;
                outline: none;
            }
        }

        button {
            display: inline-block;
            border: none;        
            width: 25px;         
            opacity: 0.5;   
            padding-top: 3px;
            background-color: white;

            &:last-child {
                padding-right: 5px;           
            }
        } 

        .invisible {
            opacity: 0;
        }

 
    }

    @media screen and (max-width: 767px) {
        .search-input {
            margin: 0 auto;
            width: 95%;
            height: 50px;

            input {
                width: 125px;   
                font-size: 16px;
                           
            }

            button {
                width: 40px;
            }       
       }
    }

</style>