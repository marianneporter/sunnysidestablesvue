<template>
    <div>
        horse details page
        horse id: {{ horse.id }}
        horse name: {{ horse.name }}
    </div>
</template>

<script setup>

    import useDB from '@/composables/useDB.js'

    const { horse } = useDB() 
   
</script>

<style lang="scss" scoped>

</style>