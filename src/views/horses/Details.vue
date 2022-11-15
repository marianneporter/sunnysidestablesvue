<template>
    <div class="content">
        <div class="horse-details-card">
            <h3>{{ horse.name }}</h3>

            <div class="card-body">
                <div class="img-area">
                    <img :src="horse.imageUrl" alt="No photo uploaded yet">
                </div>         
            
                <div class="detail-lines">
                    <div class="detail-line">
                        <span class="detail-title">Height: </span>
                        <span class="detail-value">{{ horse.heightHands }}</span>
                    </div>
                    <div class="detail-line">npm run serve
                        <span class="detail-title">Sex: </span>
                        <span class="detail-value">{{ horse.sex }}</span>
                    </div>
                    <div class="detail-line">
                        <span class="detail-title">Colour: </span>
                        <span class="detail-value"> {{ horse.colour }} </span>
                    </div>           
                    <div class="detail-line owner-line">
                        <span class="detail-title">Owners: </span>
                        <span class="detail-value">
                            <OwnersList :owners="horse.owners" />
                        </span>
                    </div>          
                    <div class="detail-line">
                        <span class="detail-title">DOB: </span>
                        <span class="detail-value">{{ inputDateToDisplayFormat(horse.dob) }}</span>
                    </div> 
                </div>
            </div>
           
            <div class="btn-area"> 
                <router-link :to="{ name: 'horseList'}" class="btn btn-secondary btn-full-mob"><font-awesome-icon icon="fa-solid fa-arrow-left" />&nbsp;Back to List</router-link>
                <router-link v-if="updateAuthOk" :to="{ name: 'add-update',  params: { id: horse.id } }"
                              class="btn btn-success btn-full-mob">Edit
                </router-link>
            </div>   
        </div>
    </div>
</template>

<script>

    import { computed, ref } from 'vue'
    import { useRoute } from 'vue-router'

    import OwnersList from '@/components/OwnersList.vue'  
    import useDates from '@/composables/useDates.js' 
    import useCheckAuthRoute from '@/composables/auth/useCheckAuthRoute.js'
  
    export default {
        name: 'Details',
        components: { OwnersList },

        setup() {
            const route = useRoute()

            const { authorisedRoute } = useCheckAuthRoute()

            const updateAuthOk = ref(authorisedRoute('add-update')) 

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

    .horse-details-card {
        background-color: white;
    }

    .detail-title {
        font-weight: 600;
    }

    @media screen and (max-width: 992px) {
        .content {
            @include mobile-background;
            padding: 32px 16px;
        }

        .horse-details-card {
            max-width: 350px;
            padding: 16px;

            .detail-line {
                padding-top: 32px;

                .detail-title {
                    display: inline-block;
                    width: 80px;                
                }
            }        
        }

        .img-area {
            img {
                display: block;
                max-width: 300px;
                height: auto;
                margin-top: 20px;
            }
        }
    }

    @media screen and (min-width: 992px) {
        .content {
            @include desktop-background($formBackgroundImage, true, 0.75);        
            display:flex;
            justify-content: center;
            align-items: center;
        }

        .card-body {
            min-height: 300px;
        }

        .horse-details-card {
            width: 600px;
            height: 650px;
            padding: 32px;

            .detail-lines {
                margin-top: 32px;
                display: flex;
                flex-wrap: wrap;
                padding-left: 32px;
 
                .detail-line {                    
                    padding-top: 16px;                  
                    width: 45%;                   
                }

                .owner-line {
                    order: 5;
                    width: auto;                   
                }
            }

            .btn-area {
                margin-top: 24px;
                display: flex;
                justify-content: space-around;                
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
    }

</style>