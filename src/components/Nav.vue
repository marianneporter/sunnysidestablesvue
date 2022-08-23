<template>
     <nav>
        <ul>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'horseList'}">
                    <!-- <img class="logo" src="./assets/build-a-bot-logo.png"> -->
                    Horse List
                </router-link>
            </li>
            <li class="nav-item">
               <router-link class="nav-link" :to="{ name: 'landing'}">                 
                    Landing
                </router-link>
            </li>               
        </ul>
    </nav>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>