<template>
    <div class="horse-card" >
        <h3 ref="horseCard">{{ horse.name }}</h3>
        <h6>Owned by:
            <OwnersNames :owners="horse.owners" />           
        </h6>  
        <div class="img-area">
             <img :src="horse.imageUrl" alt="No photo available">
        </div>         
        <div class="btn-area">
            <button v-if="editAllowed"             
                    class="btn btn-success"
                    @click="editHorse()">Edit</button>
            <button class="btn btn-primary"
                   @click="getDetails()">Details</button>
        </div>
    </div>
</template>

<script setup>  
    import { computed, ref } from 'vue'
    import OwnersNames from '@/components/OwnersNames.vue'    

    const props = defineProps({
        horse: {
            type: Object,
            required: true
        }, 
        editAllowed: {
            type: Boolean,
            required: true
        }
    }); 

    const horseCard = ref(null)
   
    const emit = defineEmits(['getDetails', 'editHorse'])

    const horse = { ...props.horse };  

    const altMessage = computed(() => `photo of ${horse.name} is not available`)

    const getDetails = () => {
        emit('getDetails', horse.id)   
    }  

    const editHorse = () => {
        emit('editHorse', horse.id)   
    }  

    
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

    @media screen and (max-width: 300px) {
        .horse-card {
            height: 425px;
            width: 270px;
        }
        .img-area {
            height: 225px;
            img {
                max-width: 250px;
                height: auto;
            }
        }

        .btn-area {
            .btn {
                min-width: 110px;              
            }
        }
    }

</style>