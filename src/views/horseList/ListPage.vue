<template>    
    <header>
         <h1>Horses...</h1>
         <div class="search-input">
             <input type="text" placeholder="search by horse's name">
             <div class="input-icon">
                 <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
             </div>
         </div>        
    </header>
   
 
    <div v-if="loading">Loading.......</div>
    <div v-else>  
        <div class="horse-cards">
           
            <div v-for="horse in horses" :key="horse.id">
                <HorseCard :horse="horse" />
            </div>
        </div>
    </div>
</template>

<script setup>
 import useDB from "@/composables/useDB.js"
 
 import HorseCard from '@/components/HorseCard.vue'
  
 const {horses, fetchHorses, loading } = useDB();

 fetchHorses()

</script>

<style lang="scss" scoped>
    header {
        display: flex;
        justify-content: space-between;
        margin: 3vh 5vw 4vh 5vw;
        
    }

    .search-input {
        width: 200px;
        height: 40px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
     
        input {
            display: inline-block;
            height: inherit;
            border: none;
            padding-left: 3px;
        }

        .input-icon {
            display: inline-block;
            padding: 7.5px;
            opacity: 0.5;
        }
    }

    .horse-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        max-width: 1200px;
        margin: 0 auto;
    }



</style>