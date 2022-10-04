<template>
    <div class="content">           
        <form @submit.prevent="addUpdateHorse()" novalidate>
            <h3>Add Horse</h3>
            <div class="form-body">
                <div class="form-element p75-width">
                    <label>Name of horse:</label>
                    <input type="text"
                    v-model="state.name">               
                </div>               
                <div class="form-element p50-width">
                    <label>Date of Birth:</label>
                    <input type="text">               

                </div>  
                    <div class="form-element p50-width">
                    <label>Colour:</label>
                    <Multiselect
                        v-model="state.colour"
                        :options="colours"                         
                    />                  
                </div>    
                <div class="form-element p50-width">
                    <label>Sex:</label>   
                    <Multiselect
                        v-model="state.sex"
                        :options="sexes"                         
                    />       
                </div>  

                <div class="form-element p50-width">
                    <label>Height(hands):</label>
                    <Multiselect
                        v-model="state.height"
                        :options="heights"                         
                    />      
                </div>  

                <div class="form-element owners-select">
                    <label>Owners:</label>
                    <Multiselect
                        v-model="state.owners"
                        mode="tags"
                        :close-on-select="false"
                        class="multiselect-owners"
                        :options=owners
                    />
                </div>
            
            </div>

            <div class="btn-area">
                <button>Cancel</button>
                <button>Add Horse</button>
            </div>  

    <div><pre>{{ state }}</pre></div>
            
        </form>        
    </div>
</template>

<script setup>
    import useSelectOptions from '@/composables/useSelectOptions.js'
    import useAddUpdate from '@/composables/models/forms/useAddUpdate'
    import { useRoute } from 'vue-router'
    import { ref } from 'vue'
    import Multiselect from '@vueform/multiselect'
   


    const route = useRoute()
 //   const owners = route.meta['owners']
   
 //   console.log(owners)

    const { sexes, colours, heights, owners } = useSelectOptions()

    const { state } = useAddUpdate()

    const addUpdateHorse = () => {

    }

 
</script>


<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>

    @import "@/assets/scss/global.scss";  


    form {
        background-color: white;
        padding: 15px;

        .form-element {
            margin-top: 20px;

            & * {
                 display: block;    
            }
        }

        .p75-width {
            min-width: 75%;
        }

        .p50-width {
            min-width: 50%;
        }
    }

    @media screen and (max-width: 992px) {
        .content {
            @include mobile-background;
        }

        form {
            width: 95%;
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 992px) {
        .content {
            @include desktop-background($formBackgroundImage, true, 0.75);  
        } 

        form {
            margin: 0 auto;
            width: 600px;
            height: 650px;    

            .form-body {
                display: flex;
                flex-wrap: wrap;
            }  
        }

        .owners-select {
            width: 200px;
            
        }

        .form-element input {
            width: 200px;
            height: 40px;
        }
    }


    .owners-select {
        #multiselect {
            width: 100px;
        }
        .multiselect-owners {
            --ms-tag-bg: #f5f5f5;
            --ms-tag-color: #383838;
            --ms-ring-width: 0;
            --ms-tag-font-weight: 550;
        }  
    }

</style>