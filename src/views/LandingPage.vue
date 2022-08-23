<template> 
    <div class="content">
        <header>
            <div class="main-content">
                <h1 >Welcome to the Sunnyside Stables Vue Demo</h1>                  
                <button class="btn btn-primary"                      
                        @click="startLogin()">
                    Login              
                </button>  
            </div>
            <transition name="slide">           
                <div v-if="displayLogin" class="login-slider">
                    <Login @loginSuccess="loginSuccess()"
                           @closeSlider="closeSlider()" />
                </div>   
             </transition>
        </header>
    </div>  
</template>

<script setup>
    import Login from '../components/Login.vue'    
    import useAuth from "@/composables/useAuth.js"
    import { useRouter } from 'vue-router'

    const router       = useRouter()
 
    const { displayLogin, setDisplayLogin, resetDisplayLogin} = useAuth()

    const startLogin   = () => {
        console.log('in setDisplayLogin')
        setDisplayLogin() 
    } 

    const loginSuccess = () => router.push({name: 'horseList'})   

    const closeSlider  = () => resetDisplayLogin()
 
</script>

<style lang="scss" scoped>


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
                display: flex;  
                position: relative; 
                
                .login-slider {
                    position: fixed;
                //    transform: translateX(400px);
                    z-index: 10;
                }
            }

            .main-content {
                display: flex;
                flex-direction: column;
                align-items: center;
              
            }

            button {
                margin-top: 16px;
                width: 200px;
                font-size: 20px;
            }
            
        }
    }

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