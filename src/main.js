import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars, faHorse, faMagnifyingGlass, faArrowLeft, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faBars)
library.add(faHorse)
library.add(faMagnifyingGlass)
library.add(faArrowLeft)
library.add(faPlus)
library.add (faXmark)

const app = createApp(App)   
          .use(router)  
          .component('font-awesome-icon', FontAwesomeIcon)
          .mount('#app')