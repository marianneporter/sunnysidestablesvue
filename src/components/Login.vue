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
            <div class="form-element"  >
                <label>Password:</label>
                <input type="password" v-model.lazy="v$.password.$model" @focus="resetPWMessage()"> 
                <ValidationMsg :model="v$.password"/>   
                <div class="error-message" v-if="incorrectPassword">
                    Email/Password Combination Invalid
                </div>
            </div>
           <div class="form-element">
                <button type="submit"
                        class="btn-full btn-primary login-btn"
                      >Log In</button>
            </div>
        </form>           
    </div>
    
</template>

<script setup>  
    import ValidationMsg from '@/components/ValidationMsg'
    import useAuth from "@/composables/useAuth.js"
    import useLogin from '@/composables/models/forms/useLogin.js'
    import { ref } from 'vue'

    const { v$, getUserCreds } = useLogin()

    const emit = defineEmits(['loginSuccess', 'closeSlider'])
 
    const { displayLogin, resetDisplayLogin, login, state } = useAuth()

    const closeSlider = () => emit('closeSlider')     

    let incorrectPassword = ref(false)

    const resetPWMessage = () => { incorrectPassword.value = false }

    const attemptLogin = async ()=> {     
        
        if (v$.value.$invalid) {                        
            v$.value.$touch()
        } else {        
            let userCreds = getUserCreds()
            let loginResult = await login(userCreds)
          
            if (loginResult === 'success') {
                emit('loginSuccess')
                closeSlider()
            } else {
                incorrectPassword.value = true
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
                    label, button {
                        display: block;   
                        margin-top: 10px;
                    }
                    input {
                        width: 90%;
                        height: 30px;                    
                    }
                }

                .login-btn {
                    margin-top: 40px;
                    font-size: 18px;                
                    color: white;                  
                }
            }
        }
    }

</style>