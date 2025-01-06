import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/common.less'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ViewUIPlus)
app.mount('#app')
