<template>
    <div>
        horse details page
        horse id: {{ id }}
        horse name: {{ horse.name }}
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { reactive } from 'vue'

    const route = useRoute()

    const horse = route.meta.horse

    console.log(typeof horse)

    console.log(horse)

    console.log(horse.name)

    const props = defineProps(['id'])
    
    
   
</script>

<style lang="scss" scoped>

</style>