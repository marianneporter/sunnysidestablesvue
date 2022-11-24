<template>
     <nav class="navbar" >
         <div class="site-name"><font-awesome-icon icon="fa-solid fa-horse fa-lg" />&nbsp; Sunnyside Stables</div>
         <a href="#" class="navbar-toggle"  @click="toggle()">
             <span><font-awesome-icon icon="fa-solid fa-bars" /></span> 
         </a>
         <transition>
            <div class="nav-link-wrapper">
                <div class="nav-links" :class="{ active: toggleNav }">
                    <ul>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'home'}">                 
                                Home
                            </router-link>
                        </li>   

                        <li class="nav-item">              
                            <router-link class="nav-link" :to="{ name: 'horseList'}">                  
                                Horse List
                            </router-link>
                        </li>
        
                        <li class="nav-item">              
                            <router-link class="nav-link" :to="{ name: 'about'}">                  
                                About
                            </router-link>
                        </li>

                        <li v-if="userFirstName" class="login-dets">
                            <div  class="greeting">Hello {{userFirstName}}</div>
                            <div><button class="logout-btn" @click="logout()">Log out?</button></div>
                        </li>             
                    </ul>    
               </div>    
            </div> 

         </transition>
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
        height: $navbarHeight; 
         

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
    }

  

    @media screen and (max-width: 992px) {
        .navbar {
            flex-direction: column;
            align-items: flex-start;
            height: auto;   
            background-color: purple;
            color: white;
            
        
         //   color: black;
          

            .navbar-toggle {
                display: flex;
                margin-top: 6px;
            }

            //.nav-link-wrapper {
                // position: absolute;
                // top: 50px;
                // left: 0px;
                // right: 0px;
                // z-index: 10;
                // background-color: $primary;
                // position: relative;
                // transform: translateX(-300px);
                
          //  }

          

            .nav-links {
           //    display: none;
            //    transform: translateY(-300px);
                position: absolute;
                top: -300px;
                background-color: green;
                z-index: 99;
                transition: top 3s;
              
                &.active {
            //    display: flex;
                //     transform: translateY(700px);
                    top: 50px;     
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
        
        // .lower-mob-nav-enter-from   { transform: translateX(-300px) }
        // .lower-mob-nav-enter-to     { transform: translate(50px) }
        // .lower-mob-nav-enter-active { transition: transform 0.75s linear }
        // .lower-mob-nav-leave-from   { transform: translate(50px)}
        // .lower-mob-nav-leave-to     { transform: translate(-300px)}
        // .lower-mob-nav-leave-active { transition: transform 0.75s linear }  
    }



</style>