import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars, faHorse, faMagnifyingGlass, faArrowLeft, faPlus, faXmark, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import { VTooltip, Tooltip } from 'floating-vue'

/* add icons to the library */
library.add(faBars)
library.add(faHorse)
library.add(faMagnifyingGlass)
library.add(faArrowLeft)
library.add(faPlus)
library.add(faXmark)
library.add(faCalendarDays)

const app = createApp(App)   
          .use(router) 
          .directive('tooltip', VTooltip) 
          .component('font-awesome-icon', FontAwesomeIcon)
          .component('VTooltip', Tooltip)
          .mount('#app')