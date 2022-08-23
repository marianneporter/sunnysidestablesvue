<template>  
    <div class="form-container">  
        <div class="close-btn">
            <button class="btn btn-secondary btn-round"
                    @click="closeSlider()">x</button>
        </div>  

       
        <form @submit.prevent="handleSubmit">   
            <h1>login</h1>
            <div>
                <label>Email:</label>
                <input type="email"  v-model="userCreds.email">
            </div>
            <div>
                <label>Password:</label>
                <input type="password" v-model="userCreds.password">       
            </div>
            <div>
                <button @click="attemptLogin()">Log In</button>
            </div>
        </form>        
    </div>  
</template>

<script setup>  
    import { reactive } from 'vue'
    import useAuth from "@/composables/useAuth.js"

    const emit = defineEmits(['loginSuccess', 'closeSlider'])
 
    const { displayLogin, resetDisplayLogin, login } = useAuth()

    const userCreds= reactive({email: null, password: null})

    const userInfo = reactive({})

    const attemptLogin = async ()=> {
        let loginResult = await login()
        emit('loginSuccess')    
    }

    const closeSlider = () => emit('closeSlider')      

</script>

<style lang="scss" scoped>
    .form-container {       
        background-color: white;
        height: 100vh;
        width: 400px;
        padding: 10px 30px;   
    }

    @media screen and (max-width: 991px) {


    }

    @media screen and (min-width: 992px) {
        .form-container {       
            background-color: white;
            height: 100vh;
            width: 400px;
            padding: 10px 30px; 

            .close-btn {
                position: absolute;
                top: 8px;
                right: 8px;
            }

            form {
                h1 {
                    padding-top: 50px;
                }
            }
       }
    }


</style>