<template>
    <header>
        <h1>Horses...</h1>

        <div  v-if="!isLoading" class="add-and-search-line">
            <div class="add-btn">
                 <button v-if="addAllowed" class="btn btn-success" 
                        @click="emit('addHorse')">Add Horse</button>  
            </div>           
            <div class="counts-and-search">
                <div class="search">
                    <HorseListHeaderSearch @search-changed="emit('searchChanged')"/>  
                </div>      
                <div class="count total-count">
                    Total Horses: {{ horseCount }}
                </div>           
                <div v-if="searchMode" class="count search-count">
                    <span v-if="searchCount === 0">
                        No horses found beginning with {{ searchTerm }}
                    </span>
                    <span v-else>
                        {{ searchCount }} horse{{searchCount===1 ? '' : 's'}}
                                        found beginning with {{ searchTerm }}  
                    </span>                              
                </div>
            </div>  
        </div>
    </header>  
</template>

<script setup>
    import useListState from "@/composables/ui-state/useListState.js"   
    import HorseListHeaderSearch from '@/components/HorseListHeaderSearch.vue'        

    const emit  = defineEmits(['searchChanged', 'addHorse'])
     
    const props = defineProps({
        isLoading: {
           type: Boolean,
           required: true
        },
        addAllowed: {
            type: Boolean,
            required: true
        }        
    }); 

    const { horseCount,
            searchCount,
            searchTerm,
            searchMode } = useListState()
    
</script>

<style lang="scss" scoped>

    /***************** small and extra small screens *************/
    @media screen and (max-width: 767px) {
        header {   
            width: 100%;
            h1 {
                margin-bottom: 12px;              
            }
        } 
        
        .add-and-search-line {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;  
    
            margin: 0 auto;    
          

         
            .counts-and-search {
                display: contents;
            }

            .search {
                order: 1;
                min-width: 100%;
              
            }

            .total-count {
                margin-top: 15px;
           //     margin-left:10px;
                order: 2;
            }

            .search-count {
                order: 3;
            }

            .add-btn {
                order: 4;
                margin-top: 10px;
                margin-right: 10px;
                margin-left: auto;

                .btn {
                    min-width: 50px;
                }
 
            }


        }
    }

  
 /*********************** medium screens *********************/
    @media screen and (min-width: 768px) {
 
        header {              
            padding: 0 25px;

            h1 {
                margin: 20px 0;
            }

            .add-and-search-line {
                display: flex;
                justify-content: space-between;  
                margin: 0 auto;
            }

            .counts-and-search {
                margin-bottom: 35px;
                max-width: 450px;        
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center;
            }   
            
            .count {
                padding: 10px;
                height: 38px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);        
            }

            .search { order: 2 }
            .total-count { order: 1 }
            .search-count { order: 3 }

            .add-btn {
              
                height: 50px;
            }
        }   
    }

     /*********************** xxl screens *********************/
    @media screen and (min-width: 1400px) {

        header {           

            h1 {
                margin: 25px 0 50px 125px;
            }

            @media screen and (max-width: 1300px) {
                h1 {
                    margin-left: 50px;
                }
            }
          
            .add-and-search-line {            
                max-width: 1100px;
            }             
        }
    }

  

    
    

</style>