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
            <div class="slider-section">
                <transition name="slide">           
                    <div v-if="displayLogin" class="login-slider">
                        <Login @loginSuccess="loginSuccess"                   
                               @closeSlider="closeSlider" />
                    </div>   
                </transition>
            </div>
        </header>
    </div>  
</template>

<script setup>
    import useAuth from "@/composables/auth/useAuth.js"
    import useCurrentUser from "@/composables/auth/useCurrentUser.js"
    import { useRouter } from 'vue-router'
    import { onUnmounted } from 'vue'
    import Login from '@/components/Login.vue'

    const router = useRouter()
 
    const { displayLogin, setDisplayLogin, resetDisplayLogin } = useAuth()

    const { loggedIn } = useCurrentUser()

    const startLogin = () => setDisplayLogin()     

    const enterSite = () => router.push({name: 'horseList'})       

    const loginSuccess = () => router.push({name: 'horseList'})  
 
    const closeSlider  = () => resetDisplayLogin()

    onUnmounted(() => resetDisplayLogin())
 
</script>

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss"; 

    /*****************************   small screens *************************************** */
    @media screen and (max-width: 991px) {
       .content {     

            @include mobile-background;

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
                    background-color: pink;
                    
                   
                }

                .slider-section {
                    margin-left:25px;  // could be a calc
                }

                button {
                    margin-top: 5vw;
                    width: 200px;
                    font-size: 20px;
                    left: 200px;
                }
            }  

        .slide-enter-from   { transform: translateX(800px) }
        .slide-enter-to     { transform: translate(0) }
        .slide-enter-active { transition: transform 0.75s linear }
        .slide-leave-from   { transform: translate(0)}
        .slide-leave-to     { transform: translate(800px) }
        .slide-leave-active { transition: transform 0.75s linear }  


        }
    }

    /*************************** large screens *******************************************/
    @media screen and (min-width: 992px) {
        
        .content { 

            @include desktop-background($desktopLandingImage, false, 1)        
 
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
        .slide-enter-active { transition: transform 0.5s linear }
        .slide-leave-from   { transform: translate(0)}
        .slide-leave-to     { transform: translate(400px) }
        .slide-leave-active { transition: transform 0.5s linear }  
    }

</style>