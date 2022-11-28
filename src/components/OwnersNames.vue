<template>
  
        <span v-for="(owner, index) in owners"
                :key="owner.id"
                v-text="getFullOwnerName(owner, index)">               
        </span>
   
</template>

<script setup>
 
    const props = defineProps({
        owners: {
            type: Array,
            required: true
        }       
    }); 
   
    const getFullOwnerName = (owner, index) => {
        let name = `${owner.firstName} ${owner.lastName}`
        if ((index + 2) < props.owners.length) {
            name += ", "
        } else if (index + 2 === props.owners.length) {
            name += ' and '
        }        
        return name;  
    }

</script>

<style lang="scss" scoped>

</style>