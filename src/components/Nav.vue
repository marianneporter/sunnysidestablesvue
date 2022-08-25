<template>
     <nav class="navbar" >
         <div class="site-name"><font-awesome-icon icon="fa-solid fa-horse fa-lg" />&nbsp; Sunnyside Stables</div>
         <a href="#" class="navbar-toggle" id="tibbles" @click="toggle()">
             <span><font-awesome-icon icon="fa-solid fa-bars" /></span> 
         </a>
         <div class="nav-links" :class="{active: toggleNav}">
            <ul>
                <li class="nav-item">              
                    <router-link class="nav-link" :to="{ name: 'horseList'}">                  
                        Horse List
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'landing'}">                 
                        Landing
                    </router-link>
                </li>    
                <li class="login-dets">
                    <div class="greeting">Hello Super Duper Tibbles</div>
                    <div class="logout-btn">Log out?</div>
                </li>
             
            </ul>    
        </div>    
    </nav>
    {{ toggleNav }}
</template>

<script setup>

    

    import { ref } from 'vue'


    let toggleNav = ref(false);

    const toggle = () => { 
        console.log('toggle clicked')
        toggleNav.value = !toggleNav.value
    }



</script> 



<style lang="scss" scoped>
    @import "@/assets/global.scss";

    .navbar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: $primary;
        color: white;
     
        .site-name {
            font-size: 20px;
            padding: 16px;
        }

        .navbar-toggle {
            position: absolute;
            top: 12px;
            right: 16px;
            display:none;
            flex-direction: column;
            justify-content: space-between;
            color: white;
        }

        .nav-links {
            ul {                
                list-style: none;     
                display: flex;
            }

            li{
                a {
                    text-decoration: none;
                    color: white;                    
                }
                padding: 16px;

                &:hover:not(:last-child) {
                    background-color: $primaryHighlight;
                }
            }

            .login-dets {
                position: fixed;
                right: 2px;
                font-size: 14px;            
                padding: 7px;

                .logout-btn {
                    padding-top: 2px;
                }
            }
        } 
    }

  

    @media screen and (max-width: 992px) {
        .navbar {
            flex-direction: column;
            align-items: flex-start;

            .navbar-toggle {
                display: flex;
            }

            .nav-links {
                display: none;

                &.active {
                    display: flex;
                }

                width: 100%;

                ul {
                    width: 100%;
                    flex-direction: column;

                    li {
                        text-align: center;
                        padding: 10px;
                    }
                }

                .login-dets {
                    position: static;

                    .greeting {
                        display: none;
                    }
                }
            } 


        }


       
    }



</style>