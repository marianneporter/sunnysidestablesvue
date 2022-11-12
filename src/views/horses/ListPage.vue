<template>
    <div class="content">
    
        <header>
            <h1>Horses...</h1>
        </header>    
        <main>      
            <div  v-if="!isLoading" class="add-and-search-line">
                <div class="add-btn">
                    <router-link :to="{ name: 'add-update', params: { id: 0} }" 
                        class="btn btn-success">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        &nbsp;Add Horse
                    </router-link>       
                </div>  
                <div class="counts-and-search">
                    <div class="search">
                        <search-horses @searchChanged="searchChanged"/>  
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
        

            <div v-if="horses" class="horse-cards">   
                <Loading v-model:active="isLoading"  
                        loader="dots"
                        color="#28a428" />
                <div v-for="horse in horses" :key="horse.id">
                    <HorseCard :horse="horse"
                                @getDetails="getDetails"
                                @editHorse="editHorse" /> 
                </div>
            </div> 
        </main>

        <footer>
        <div class="btn-area">
                <button v-if="horses && (horses.length < searchCount)" 
                        class="btn btn-primary"
                        @click="loadMore()">Load more</button>
            </div>
        </footer>
</div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'

    import { createToaster } from '@meforma/vue-toaster';
  
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';

    import useDB from "@/composables/useDB.js"
    import useListState from "@/composables/ui-state/useListState.js"
    import useMessageForNextPage from '@/composables/ui-state/useMessageForNextPage'    
  
    import HorseCard from '@/components/HorseCard.vue' 
    import SearchHorses from '@/components/SearchHorses.vue'     
    
    const { fetchHorses } = useDB();
    
    const { pageIndex,
            setScrollPos, 
            scrollToPos, 
            searchTerm,  
            searchCount,
            searchMode,
            horseCount,    
            horses,
            addDbHorsesToList,
            clearListState   } = useListState();

    const { getMessage } = useMessageForNextPage()

    const toaster = createToaster({ position: 'top' });

    const isLoading = ref(false)

   

    onMounted( async () => {

        isLoading.value = true        
        const dbHorseData = await fetchHorses()  
        addDbHorsesToList(dbHorseData)
        isLoading.value=false;
   
        scrollToPos()
        let statusMessage = getMessage() 
        if (statusMessage) {
            toaster.show(statusMessage.content,
                        {type: statusMessage.type})             
        }
    }) 
    
    const router = useRouter()
    
    const loadMore = async () => {        
        pageIndex.value++
        const dbHorseData = await fetchHorses()  
        addDbHorsesToList(dbHorseData)     
    }

    const getDetails = (id) => {
        setScrollPos()
        router.push({ name: "details", params: { id: id }} )
    }

    const editHorse = (id) => {
        setScrollPos()
        router.push({ name: "add-update", params: { id: id }} )       
    }

    const searchChanged = async () => {  

        const prevPageIndex = pageIndex.value   
        pageIndex.value=0
       
        const dbHorseData = await fetchHorses()   

        if (dbHorseData.searchCount > 0) {
            clearListState()
            addDbHorsesToList(dbHorseData)
        } else {
            searchCount.value = 0
            pageIndex.value= prevPageIndex
        }
    }    

</script>

<style lang="scss" scoped>

    .content {
        padding: 10px;
    }

    main {

        max-width: 1200px;
        margin: 0 auto;

        .horse-cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 40px;
        }
    }
 
    footer {
        .btn-area {      
            height: 100px;
            width: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 100px;

            button {
                width: 250px;
            }        
        }
    }

    @media screen and (max-width: 992px) {
        header {
            margin: 10px 5px;
        }

        .horse-cards {
            margin-top: 30px;
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
                order: 2;
            }

            .search-count {
                order: 3;
            }

            .add-btn {
                order: 4;
                max-width: 50%;
                margin-right: 10px;
                margin-left: auto;
            }
        }
    }

     @media screen and (min-width: 992px) {

        header {
            margin: 30px 50px;
        } 

        main {

            .add-and-search-line {
                display: flex;
                justify-content: space-between;
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
            }
     }   

</style>