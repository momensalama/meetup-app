import { computed, createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useStore } from './stores/store'

const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const store = useStore()

const isAuth = computed(() => store.isAuth)

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired && from.path && !isAuth.value) {
    next('/signin')
  } else if (!to.meta.authRequired && !from.path && isAuth.value) {
    next('/')
  } else {
    next()
  }
})

app.mount('#app')
