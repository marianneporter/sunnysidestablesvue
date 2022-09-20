<template> 
    <div class="content">
        <header>
            <div class="main-content">
                <h1 >Welcome to the Sunnyside Stables Vue Demo</h1>  
                <button v-if="loggedIn" 
                        class="btn btn-accent"
                        @click="enterSite()">
                    Enter Site             
                </button>  
                <button v-else 
                        class="btn btn-accent"
                        @click="startLogin()">
                    Login              
                </button>  
            </div>
            <transition name="slide">           
                <div v-if="displayLogin" class="login-slider">
                    <Login @loginSuccess="loginSuccess"
                           @loginFailure="loginFailure" 
                           @closeSlider="closeSlider" />
                </div>   
             </transition>
        </header>
    </div>  
</template>

<script setup>
    import useAuth from "@/composables/useAuth.js"
    import { useRouter } from 'vue-router'
    import { onUnmounted } from 'vue'
    import Login from '@/components/Login.vue'

    const router = useRouter()
 
    const { displayLogin, setDisplayLogin, resetDisplayLogin, loggedIn} = useAuth()

    const startLogin = () => setDisplayLogin()     

    const enterSite = () => router.push({name: 'horseList'})       

    const loginSuccess = () => router.push({name: 'horseList'})  

    const loginFailure = (failureMessage) => {
  
        console.log('failure message is ' + failureMessage)
    }

    const closeSlider  = () => resetDisplayLogin()

    onUnmounted(() => resetDisplayLogin())
 
</script>

<style lang="scss" scoped>

     @import "@/assets/global.scss";

    /*****************************   small screens *************************************** */
    @media screen and (max-width: 991px) {
       .content {         
            background: url(../assets/images/mobilebackground.jpg) no-repeat center center fixed; 
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            height: 100vh;
            width: 100%;
            overflow: hidden;             
            padding: 100px 0 0 16px;

            header {
                .main-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center
                }                   
                
                .login-slider {    
                    z-index: 10;
                    width: 95vw;
                    position: relative; 
                    top: -80px;                       
                }

                button {
                    margin-top: 24px;
                    width: 200px;
                    font-size: 20px;
                }
            }    
        .slide-enter-from   { transform: translateX(100vw) }
        .slide-enter-to     { transform: translateX(0) }
        .slide-enter-active { transition: transform 2s ease-in }
        .slide-leave-from   { transform: translateX(0)}
        .slide-leave-to     { transform: translateX(100vw) }
        .slide-leave-active { transition: transform 2s ease-out }   
        }
    }

    /*************************** large screens *******************************************/
    @media screen and (min-width: 992px) {
        
        .content { 
        
            background: url(../assets/images/manyHorses.jpg) no-repeat center center fixed; 
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            height: 100vh;
            width: 100%;
            overflow: hidden;    
        }

        header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .main-content {
                    position: relative;
                    width: 100%;

                    h1 {
                    color: white;
                    margin: 30px 0 0 20px;
                    }

                    button {
                        position: fixed;
                        top: 16px;
                        right: 16px;              
                    }
                }
                .login-slider {
                    z-index: 10;           
                }
        }  
        .slide-enter-from   { transform: translateX(400px) }
        .slide-enter-to     { transform: translate(0) }
        .slide-enter-active { transition: transform 2s ease-in }
        .slide-leave-from   { transform: translate(0)}
        .slide-leave-to     { transform: translate(400px) }
        .slide-leave-active { transition: transform 2s ease-out }       
        

    }

 
</style>