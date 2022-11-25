<template>
     <nav class="navbar">
        <div class="site-name"><font-awesome-icon icon="fa-solid fa-horse fa-lg" />&nbsp; Sunnyside Stables</div>
        <a href="#" class="navbar-toggle"  @click="toggle()">
            <span><font-awesome-icon icon="fa-solid fa-bars" /></span> 
        </a>  

        <div class="mob-divider-line"></div>    
        <ul :class="{ active: toggleNav }">

            <li>
                <router-link class="nav-link" :to="{ name: 'home'}">                 
                    Home
                </router-link>
            </li>   

            <li>              
                <router-link class="nav-link" :to="{ name: 'horseList'}">                  
                    Horse List
                </router-link>
            </li>

            <li>              
                <router-link class="nav-link" :to="{ name: 'about'}">                  
                    About
                </router-link>
            </li>

            <li v-if="userFirstName" class="login-dets">
                <div  class="greeting">Hello {{userFirstName}}</div>
                <div class="mob-divider-line"></div>
                <button class="logout-btn" @click="logout()">Log out?</button>
            </li>             
        </ul>   
    </nav>  
</template>

<script setup>    

    import { ref } from 'vue'
    import useAuth  from '@/composables/auth/useAuth.js'
    import useCurrentUser from '@/composables/auth/useCurrentUser.js'

    import { useRouter } from 'vue-router'

    const router = useRouter() 

    const {  logout: authLogout } = useAuth()
    const { userFirstName } = useCurrentUser()

    let toggleNav = ref(false);

    const toggle = () => toggleNav.value = !toggleNav.value   

    const logout = () => {
        authLogout()
        router.push({name: 'home'})  
    }
</script> 

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss";

    .navbar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: $primary;
        color: white;   
        min-width: 100%; 

        .site-name {
            font-size: 20px;
            padding: 16px;
            margin-right: 16px;
        }

        .navbar-toggle {            
            display:none;         
        }   

        ul {                
            list-style: none;     
            display: flex;    
            column-gap: 30px;
            align-items:center;        

            li{                
                a {
                    display: block;
                    text-decoration: none;
                    color: white;   
                    padding: 16px 24px; 
                }              

                &:hover:not(:last-child) {
                    background-color: $primaryHighlight;
                }
           }            
        }


        .login-dets {
            position: absolute;
            right: 2px;
            font-size: 14px;            
            padding: 7px;

            .logout-btn {
                position: relative;
                padding-top: 2px;
                color: white;
                background-color: $primary;
                border: none;
            }
        }      
    }  

    @media screen and (max-width: 992px) {     

        .navbar {
            flex-direction: column;
            align-items: flex-start;
            height: auto;   
            background-color: $primary;
            color: white;
 

            .navbar-toggle {
                display: flex;
                margin-top: 6px;
            }

            .site-name {
                position: relative; 
                z-index: 2;
                background-color: $primary;  
                width: 80%;                      
            }

            .navbar-toggle {
                display:flex;
                position: absolute;
                z-index: 2;
                top: 12px;
                right: 16px;              
                flex-direction: column;
                justify-content: space-between;
                color: white;
            }

            ul {
                position: absolute;
                top: -200px;
                background-color: $primary;
                z-index: 1;
                transition: top 1s;
                width: 100%;
                flex-direction: column;

                li {
                    text-align: center;

                    a {
                        padding: 15px;
                    }                                      
                }
              
                &.active {
                    top: 50px;     
                }

                .login-dets {
                    position: relative;
                    width: 100%;

                    .greeting {
                        display: none;
                    }

                    .mob-divider-line {
                        border-bottom: 0.25px solid white;
                        width: 50%;
                        margin: 0 auto;
                    }

                     .logout-btn {
                         padding: 20px 0;
                         font-size: 16px;
                     }
                }
            }            
        } 
    }
</style>