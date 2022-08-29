<template>    
    <h1>welcome to the horse list</h1>
 
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
    .horse-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        max-width: 1200px;
    }

</style>