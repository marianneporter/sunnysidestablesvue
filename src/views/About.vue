<template>
    <div class="content">
        <div class="about-card">
            <h1>Demonstration Vue App</h1>          
            <p>My name is Marianne Porter, this app demonstates some of what I have learned on my learning journey in web development</p>
            <p>The app stores details about ficticious horses and their owners</p>
            <p>For more information please see my github repository</p>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/global.scss"; 

    .content {     
        display: flex;
        justify-content: center;
        align-items: center; 
    }

    .about-card {
        background-color: white; 
 
        p:first-of-type {
           margin-top: 1.5rem;
        }

        p {
           margin-top: 1.1rem;
        }
      
    }

    @media screen and (min-width: 768px) {
        .content {
            @include desktop-background($formBackgroundImage, true, 0.75);                   
        }

        .about-card {           
            height: 500px;
            width: 700px;
            background-color: white;
            padding: 60px;
        }
    }

    @media screen and (max-width: 768px) {
        .content {
            @include mobile-background;   
            align-items: flex-start;    
        }

        .about-card {
            margin-top: 40px;
            height: 500px;
            width: 80%;
            background-color: white;
            padding: 30px;
        }
    }
     

</style>