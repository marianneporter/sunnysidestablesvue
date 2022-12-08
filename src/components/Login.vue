<template>  
    <div class="form-container">  
        <div class="close-btn">
            <button class="btn-secondary btn-round"
                    @click="closeSlider()">x</button>
        </div>         
        <form @submit.prevent="attemptLogin()" novalidate>   
            <h1>Login</h1>
            <div class="form-element">
                <label>Email:</label>
                <input type="text" v-model.lazy="v$.email.$model" @focus="resetPWMessage()"> 
                <ValidationMsg :model="v$.email"/>
            </div>
            <div class="form-element">
                <label>Password:</label>
                <input type="password" v-model.lazy="v$.password.$model" @focus="resetPWMessage()"> 
                <ValidationMsg :model="v$.password"/>   
                <div class="error-message" v-if="incorrectPassword" >
                    Email/Password Combination Invalid
                </div>
            </div>
           <div class="form-element">
                <div class="vl-parent">
                    <Loading v-model:active="isLoading"                      
                            :is-full-page="fullPage"
                            :width="loadingIndicatorSize"
                            :height="loadingIndicatorSize"
                             loader="dots"
                             color=white />

                    <button type="submit"
                            class="btn-full btn-primary login-btn"
                            :class="{ 'no-text' : isLoading }"
                          >Log In
                    </button>
                </div>
            </div>
        </form>           
    </div>
    
</template>

<script setup>  
    import ValidationMsg from '@/components/ValidationMsg'
    import useAuth from "@/composables/auth/useAuth.js"
    import useLogin from '@/composables/auth/useLogin.js'  
    import useMessageForNextPage from '@/composables/ui-state/useMessageForNextPage.js'
      
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';

    import { ref } from 'vue'

    const fullPage = ref(false)  
    const isLoading = ref(false)
    const loadingIndicatorSize = ref(30)
   
    const { v$, getUserCreds } = useLogin()
    const { setMessage } = useMessageForNextPage()

    const emit = defineEmits(['loginSuccess', 'closeSlider'])
 
    const { login } = useAuth()

    const closeSlider = () => emit('closeSlider')        

    let incorrectPassword = ref(false)

    const resetPWMessage = () => { incorrectPassword.value = false }

    const attemptLogin = async ()=> {     
               
        if (v$.value.$invalid) {  

            v$.value.$touch()

        } else {              

            isLoading.value = true

            try {
                let userCreds = getUserCreds()       
                let loginResult = await login(userCreds)
            
                isLoading.value=false;

                if (loginResult === 'success') {
                    closeSlider()
                    emit('loginSuccess')                
                } else {
                    incorrectPassword.value = true
                }               
            }
            catch(err) {             
                isLoading.value = false
                closeSlider()
                setMessage('Sorry! Application is not available at present', 'error')
            }

        }       
    }

</script>

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss";

    .form-container {

        position: relative;  

        .close-btn {            
            position: absolute;
            top: 8px;
            right: 8px;                
        }

        h1 {
            color: $primary;
        }

        input {
            padding-left: 5px;
        }

        .login-btn {
            margin-left: 0;
        }

        .login-btn:disabled {
            opacity: 0.5;
        }
    }

    @media screen and (max-width: 992px) {
        .form-container {
            margin-top: 20px;
            width: 95vw;
            height: 600px;
            background-color: white;

            form {
                font-size: 24px;
                padding: 70px 10px;
                max-width: 500px;
                margin: 0 auto;

                .form-element {
                    margin-top: 20px;
                    label, button {
                        display: block;
                        margin-top: 10px;
                    }

                    input, button {
                        height: 50px;
                        width: 90%;
                        border: 1px solid $secondary;
                        font-size: 18px;
                    }
                } 

                .login-btn {
                    margin-top: 30px;
                    font-size: 24px;                 
                    color: white;
                    padding-bottom: 40px;                   
                }

                .login-btn.no-text {
                    color: transparent;
                }
            }
        }
    }

    @media screen and (min-width: 992px) {
        .form-container {   
            background-color: white;
            height: 100vh;
            width: 400px;
            padding: 10px 30px; 

            form {
                h1 {
                    padding-top: 50px;
                }

                .form-element {
                    width: 290px;
                    label, button {
                        display: block;   
                        margin-top: 10px;
                       
                    }
                    input {                     
                        width: 100%;  
                        height: 35px;                    
                    }
 
                }

                .login-btn {
                    margin-top: 40px;
                    width: 100%;
                    font-size: 18px;                
                    color: white;   
                }

                .login-btn.no-text {
                     color: transparent;
                }
            }
        }
    }

</style>