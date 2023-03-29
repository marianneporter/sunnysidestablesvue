<template>
    <div class="content">
        <div class="horse-details-card">
            <h3>{{ horse.name }}</h3>

            <div class="card-body">
                <div class="img-area">
                    <img :src="horse.imageUrl" alt="No photo available">
                </div>         
            
                <div class="detail-lines">
                    <div class="detail-line">
                        <div class="detail-title">Height: </div>
                        <div class="detail-value">{{ horse.heightHands }}</div>
                    </div>
                    <div class="detail-line">
                        <div class="detail-title">Sex: </div>
                        <div class="detail-value">{{ horse.sex }}</div>
                    </div>
                    <div class="detail-line">
                        <div class="detail-title">Colour: </div>
                        <div class="detail-value"> {{ horse.colour }} </div>
                    </div>   
                    <div class="detail-line">
                        <div class="detail-title">DOB: </div>
                        <div class="detail-value">{{ inputDateToDisplayFormat(horse.dob) }}</div>
                    </div> 
                    <div class="detail-line owner-line">
                        <div class="detail-title">Owned by: </div>
                        <div class="detail-value">
                            <OwnersNames :owners="horse.owners" />
                        </div>
                    </div>  
                </div>
            </div>
           
            <div class="btn-area"> 
                <router-link :to="{ name: 'horseList'}" class="btn btn-secondary btn-full-mob"><font-awesome-icon icon="fa-solid fa-arrow-left" />&nbsp;Back to List</router-link>
                <router-link v-if="updateAuthOk" :to="{ name: 'horse-add-update',  params: { id: horse.id } }"
                              class="btn btn-success btn-full-mob">Edit
                </router-link>
            </div>   
        </div>
    </div>
</template>

<script>

    import { computed, ref } from 'vue'
    import { useRoute } from 'vue-router'

    import OwnersNames from '@/components/OwnersNames.vue'  
    import useDates from '@/composables/utility/useDates.js' 
    import useCheckAuthRoute from '@/composables/auth/useCheckAuthRoute.js'
  
    export default {
        name: 'HorseDetails',
        components: { OwnersNames },

        setup() {
            const route = useRoute()

            const { authorisedRoute } = useCheckAuthRoute()

            const updateAuthOk = ref(authorisedRoute('horse-add-update')) 

            const horse = ref({})

            horse.value = route.meta['horse']  
        
            const { inputDateToDisplayFormat } = useDates()
   
            const altMessage = computed(() => `photo of ${horse.value.name} is not available`)    

            return {
                horse, inputDateToDisplayFormat, updateAuthOk
            }
        }
    }   
   
</script>

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss";  

    .content {     
        padding: 20px 10px;
    }

    .horse-details-card {
         background-color: white;
         padding: 16px 8px;
         margin: auto;


        .detail-lines {

            margin-top: 16px;

            .detail-line {
                line-height:24px;              
            }
            
            .detail-line.owner-line {
                padding-top: 2px;
                line-height: 20px; 
            }

            .detail-title, .detail-value {
               display: inline-block;
            }

            .detail-title {
                width: 80px;
            }

            .detail-value {
                width: calc(95% - 80px);
                vertical-align: top;
            }  
        } 
        
        .btn-area > * {
            margin: 5px;
        }
    }


    /*********************** extra small screens *********************/
    @media screen and (max-width: 299px) {
        .content {
           @include mobile-background;         
        }

        .img-area {
            img {
                display: block;
                max-width: 250px;
                height: auto;           
                margin: 10px auto;
            }
        }
    }

     /*********************** small screens *********************/
    @media screen and (min-width: 300px) and (max-width: 767px),
                      (min-width: 768px) and (max-height: 699px) {
        .content {
            @include mobile-background;        
        }

        .horse-details-card {
            max-width: 600px;
            padding: 16px;                        
        }

        .img-area {
            img {
                display: block;
                max-width: 300px;
                height: auto;
                margin: 8px auto;
            }
        }  
    }

     /*********************** medium and large screens *********************/
    @media screen and (min-width: 768px) and (min-height: 700px) {
        .content {
            @include desktop-background($formBackgroundImage, true, 0.75);              
            display:flex;
            justify-content: center;
            align-items: center; 
            min-height: $contentHeight;       
            position: fixed;         
        } 

        .card-body {         
            padding: 0 32px 16px 32px;  
        }

        
        h3 {
             margin-left: 24px;          
        }

        .horse-details-card {
            width: 600px;      
            min-height: 550px;
            padding: 32px;  
        }

        .detail-lines {
            display: flex;
            flex-wrap: wrap;

            .detail-line {
                width: 45%;
                line-height: 32px;
                padding-left: 20px;
            }

            .detail-line.owner-line {
                padding-top: 6px;
                width: 95%;              
                line-height:20px;        
            }
        }

        .img-area {           
            img {
                display: block;
                margin-right: 24px;
                margin-left: auto;
                max-width: 375px;
                height: auto;
                margin-top: 20px;
            }         
        } 

        .btn-area {         
            border-top: 0.5px solid #BEBEBE;
            padding-top: 20px;
            display: flex;
            justify-content: space-around;     
            .btn {
                width: 30%;
            }           
        }  
    }

</style>