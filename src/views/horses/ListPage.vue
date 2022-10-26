<template>    
    <header>
        <h1>Horses...</h1>
        <search-horses @searchChanged="searchChanged"/>
    </header>
   
    <main>      
        <router-link :to="{ name: 'add-update', params: { id: 0} }" 
            class="btn btn-success add-btn">
                <font-awesome-icon icon="fa-solid fa-plus" />
            &nbsp;Add Horse
        </router-link>
        <div class="horse-cards">                       
            <div v-for="horse in horses" :key="horse.id">
                <HorseCard :horse="horse"
                            @getDetails="getDetails"
                            @editHorse="editHorse" /> 
            </div>
        </div> 
    </main>

    <footer>
       <div class="btn-area">
            <button v-if="horses && (horses.length < horseCount)" 
                    class="btn btn-primary"
                    @click="loadMore()">Load more</button>
        </div>
    </footer>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    import { createToaster } from '@meforma/vue-toaster';

    import useDB from "@/composables/useDB.js"
    import useListState from "@/composables/ui-state/useListState.js"
    import useMessageForNextPage from '@/composables/ui-state/useMessageForNextPage'    
  
    import HorseCard from '@/components/HorseCard.vue' 
    import SearchHorses from '@/components/SearchHorses.vue'     
    
    const { fetchHorses, loading, horseCount } = useDB();
    const { pageSize, 
            pageIndex,
            setScrollPos, 
            scrollToPos, 
            searchTerm,       
            horses   } = useListState();
    const { getMessage } = useMessageForNextPage()

    const toaster = createToaster({ position: 'top' });

    onMounted(() => {
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

    const searchChanged = (search) => {
        if (search) {
            fetchHorses(pageIndex.value, pageSize.value, searchTerm.value)
        } else {
            fetchHorses(pageIndex.value, pageSize.value)
        }
    }    

</script>

<style lang="scss" scoped>
    header {
        display: flex;
        justify-content: space-between;    
        margin: 30px 5%;        
    }    

    main {
        .add-btn {
            margin-bottom: 20px;
            margin-left: 15px;
            max-width: 165px;
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