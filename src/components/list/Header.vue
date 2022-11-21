<template>
    <header>
        <h1>Horses...</h1>

        <div  v-if="!isLoading" class="add-and-search-line">
            <div class="add-btn">
                 <button v-if="addAllowed" class="btn btn-success" @click="emit('addHorse')">Add Horse</button>  
            </div>           
            <div class="counts-and-search">
                <div class="search">
                    <search-horses @searchChanged="emit('searchChanged')"/>  
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
    import SearchHorses from '@/components/list/SearchHorses.vue'        

    const emit  = defineEmits(['searchChanged', 'addHorse'])
     
    const props = defineProps({
        isLoading: Boolean,
        addAllowed: Boolean        
    }); 

    const { horseCount,
            searchCount,
            searchTerm,
            searchMode } = useListState()
    
</script>

<style lang="scss" scoped>

    @media screen and (max-width: 992px) {
        header {   
            width: 90%;
            margin: 15px auto;

            h1 {
                margin-bottom: 8px;
            }
        } 
        
        .add-and-search-line {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;        
         
            .counts-and-search {
                display: contents;
            }

            .search {
                order: 1;
                min-width: 100%;
            }

            .total-count {
                margin-top: 15px;
                order: 2;
            }

            .search-count {
                order: 3;
            }

            .add-btn {
                order: 4;
                max-width: 50%;
                margin-top: 10px;
                margin-right: 10px;
                margin-left: auto;
            }
        }
    }

    @media screen and (min-width: 992px) {
 
        header {
            margin: 30px 100px;          

            .add-and-search-line {
                display: flex;
                justify-content: space-between;
                max-width: 1200px;
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
                padding: 10px 20px;
                height: 38px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);        
            }

            .search { order: 2 }
            .total-count { order: 1 }
            .search-count { order: 3 }

            .add-btn {
                margin-top: 16px;
                height: 50px;
            }
        }   
            
 
    }
    

</style>