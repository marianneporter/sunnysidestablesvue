<template>  
    <div class="error-message" v-if="model.$error">
        {{ model.$errors[0].$message }}
    </div>  
</template>

<script setup>
    const props = defineProps({
        model: Object        
    });    
</script>

<style lang="scss" scoped>
   @import "@/assets/scss/global.scss"; 
</style>