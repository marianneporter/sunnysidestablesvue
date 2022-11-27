<template>
    <div class="content">

        <Header @addHorse="addHorse"
                @searchChanged="searchChanged"
                :isLoading="isLoading"
                :addAllowed="addUpdateAuthOk"/>

        <main> 
            <div v-if="horses" class="horse-cards">   
                <Loading v-model:active="isLoading"  
                        loader="dots"
                        color="#28a428" />
                <div v-for="horse in horses" :key="horse.id">
                    <HorseCard :horse="horse"
                               :editAllowed="addUpdateAuthOk" 
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
  
    import Header from '@/components/list/Header.vue'
    import HorseCard from '@/components/list/HorseCard.vue'  

    import { onMounted, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router' 
  
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';

    import useDB from "@/composables/database/useDB.js"
    import useListState from "@/composables/ui-state/useListState.js"
    import useCheckAuthRoute from '@/composables/auth/useCheckAuthRoute.js'
    import useMessageForNextPage from '@/composables/ui-state/useMessageForNextPage.js'
      
    const router = useRouter()
    const route = useRoute()

    const { fetchHorses } = useDB()

    const { authorisedRoute } = useCheckAuthRoute()

    const { setMessage } = useMessageForNextPage()

    const addUpdateAuthOk = ref(authorisedRoute('add-update'))    
        
    const { pageIndex,
            setScrollPos, 
            scrollToPos,            
            searchCount,                 
            horses,
            addDbHorsesToList,
            clearListState   } = useListState();

    const isLoading = ref(false)   

    onMounted( async () => {
        if (horses.value.length === 0) {
            isLoading.value = true            
            let dbHorseData = {}
            try {
                 dbHorseData = await fetchHorses()  
                 addDbHorsesToList(dbHorseData)
                 isLoading.value=false;  
            }   
            catch(err) {
                 isLoading.value=false;  
                 setMessage('Sunnyside Stables is not available at present - please try later', 'error')
                 router.push({name: 'home'})
            } 

        } else {
            scrollToPos()
        }       
    }) 
    
    const loadMore = async () => {        
        pageIndex.value++
        const dbHorseData = await fetchHorses()  
        addDbHorsesToList(dbHorseData)     
    }

    const getDetails = (id) => {
        setScrollPos()
        router.push({ name: "details", params: { id: id }} )
    }

    const addHorse = () => {
        router.push({ name: "add-update", params: { id: 0 }} )    
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

        .horse-cards {
            margin-top: 30px;
        }
    }

</style>