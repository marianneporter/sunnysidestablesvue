<template>
    <div class="horse-card">
        <h3>{{ horse.name }}</h3>
        <h6>Owned by:
            <span v-for="(owner, index) in horse.owners"
                  :key="owner.id"
                  v-text="getFullOwnerName(owner, index)">               
            </span>
        </h6>  
        <div class="img-area">
             <img :src="horse.imageUrl" :alt="altMessage">
        </div>         
        <div class="btn-area">
            <button class="btn btn-success">Edit</button>
            <button class="btn btn-primary">Details</button>
        </div>
      

    </div>
</template>

<script setup>  
    import { computed } from 'vue'

    const props = defineProps({
        horse: Object,
    }); 

    const horse = { ...props.horse };  

    const getFullOwnerName = (owner, index) => {
        let name = `${owner.firstName} ${owner.lastName}`
        if ((index + 2) < horse.owners.length) {
            name += ", "
        } else if (index + 2 === horse.owners.length) {
            name += ' and '
        }        
        return name;  
    }

    const altMessage = computed(() => `photo of ${horse.name} is not available`)
    
</script>

<style lang="scss" scoped>
    .horse-card {     
        height: 425px;
        width: 350px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        padding: 20px 10px;
    }

    .img-area {
        height: 250px;
        img {
            display: block;
            max-width: 320px;
            height: auto;
            margin-top: 20px;
        }
    }


    .btn-area {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }

</style>