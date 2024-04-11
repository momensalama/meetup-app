<script setup lang="ts">
import { useStore } from '@/stores/store'
import AppButton from '@/ui/AppButton.vue'
import { logout } from '@/utils/apiAuth'
import { AkLocation } from '@kalimahapps/vue-icons'
import { AdLock } from '@kalimahapps/vue-icons'
import { PhLightSignIn } from '@kalimahapps/vue-icons'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()

const isAuth = computed(() => store.isAuth)

async function handleLogout() {
  await logout()
  store.isAuth = false
  router.push('/signin')
}
</script>

<template>
  <header>
    <div class="logo">
      <router-link to="/"> MeetupApp </router-link>
    </div>

    <nav>
      <ul>
        <li v-if="isAuth">
          <router-link to="/new-meetup" class="transition">
            <AkLocation />
            Organize Meetup
          </router-link>
        </li>
        <AppButton type="button" :method="handleLogout" v-if="isAuth"> logout &rarr; </AppButton>

        <li v-if="!isAuth">
          <router-link to="/signup" class="transition">
            <AdLock />
            Sign up
          </router-link>
        </li>
        <li v-if="!isAuth">
          <router-link to="/signin" class="transition">
            <PhLightSignIn />
            Sign in
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
  border-bottom: 1px solid #ccc;
  button {
    font-size: larger;
  }
}
.logo {
  a {
    font-size: x-large;
    font-weight: 700;
    font-family: 'Glory';
  }
}

nav {
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    li {
      a {
        font-size: larger;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
}
</style>
