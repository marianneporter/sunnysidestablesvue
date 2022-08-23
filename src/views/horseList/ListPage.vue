<template>
    
    <h1>welcome to the horse list</h1>
    <div v-if="loading">Loading.......</div>
    <div v-else>
        length{{horses.length}}
        <div v-for="horse in horses" :key="horse.id">
            name: {{ horse.name }}
        </div>
    </div>
</template>

<script setup>
 import useDB from "@/composables/useDB.js"
 const { horses, fetchHorses, loading } = useDB();
 
 fetchHorses()
 

</script>

<style lang="scss" scoped>

</style>
