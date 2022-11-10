<template>    
    <header>
        <h1>Horses...</h1>
        <search-horses @searchChanged="searchChanged"/>        
    </header>
   
    <main>  
        <!-- <div v-if="!isLoading" class="top-line">
            <router-link :to="{ name: 'add-update', params: { id: 0} }" 
                class="btn btn-success add-btn">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                &nbsp;Add Horse
            </router-link>


            <div class="counts">

               
                <div v-if="searchCount" class="count">
                    &nbsp;Horses beginning with searchTerm = {{ searchCount }}
                </div>

                <div class="count">
                    Total Horses: {{ horseCount }}
                </div>

            </div>
        </div>    -->

        <div v-if="!isLoading" class="top-line">

            <router-link :to="{ name: 'add-update', params: { id: 0} }" 
                class="btn btn-success add-btn">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                &nbsp;Add Horse
            </router-link>
               
            <div v-if="searchMode" class="count">
                <span v-if="searchCount === 0">
                    No horses found beginning with {{ searchTerm }}
                </span>
                <span v-else>
                    {{ searchCount }} horses found beginning with {{ searchTerm }}  
                </span>              
            </div>

            <div class="count total-count">
                Total Horses: {{ horseCount }}
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
    const { pageSize, 
            pageIndex,
            setScrollPos, 
            scrollToPos, 
            searchTerm,  
            searchCount,
            searchMode,
            horseCount,    
            horses,
            clearListState   } = useListState();

    const { getMessage } = useMessageForNextPage()

    const toaster = createToaster({ position: 'top' });

    const isLoading = ref(false)

    onMounted( async () => {

        isLoading.value = true        
        await fetchHorses()  
        isLoading.value=false;
   
        scrollToPos()
        let statusMessage = getMessage() 
        if (statusMessage) {
            toaster.show(statusMessage.content,
                        {type: statusMessage.type})             
        }
    }) 
    
    const router = useRouter()
    
    const loadMore = () => {        
        pageIndex.value++
        fetchHorses(pageIndex.value, pageSize.value)        
    }

    const getDetails = (id) => {
        setScrollPos()
        router.push({ name: "details", params: { id: id }} )
    }

    const editHorse = (id) => {
        setScrollPos()
        router.push({ name: "add-update", params: { id: id }} )       
    }

    const searchChanged = () => {
        clearListState()  
        fetchHorses()      
    }    

</script>

<style lang="scss" scoped>
    header {
        display: flex;
        justify-content: space-between;    
        margin: 30px 5%;        
    }    

    main {

        .top-line {
            display: flex;
            justify-content: space-between;
           
        }

        // .counts {
        //     display: flex;
        //     column-gap: 20px;
        //     height: 40px;
        //     align-items: center;
            

        //     // .count {
        //     //     padding: 10px;
        //     //     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            
        //     // }
      
      
        // }

       
            

        .count {
            margin-top: 15px;
            padding: 10px;
            height: 40px;

            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        
        }

        .total-count {
            width: 165px;
            padding-left: 20px;
        }
      
      
       

        .add-btn {
         margin-bottom: 20px; 
      //      margin-left: 15px;
            width: 165px;
        }
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


    @media screen and (max-width: 500px){
       header {
            display: block;
            margin-left: 5px;
           .search-input {
               margin-top: 15px;
               margin-right: 5px;
               margin-left: auto;
               width: 240px;

               input {
                   width: 200px;
               }              
           }
       }
    }

</style>