<script setup lang="ts">
import { useStore } from '@/stores/store'
import AppButton from '@/ui/AppButton.vue'
import AppSpinnerMini from '@/ui/AppSpinnerMini.vue'
import { signin } from '@/utils/apiAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const error = ref<string>('')

const router = useRouter()
const store = useStore()
const isSignin = ref<boolean>(false)

async function handleSubmit(event: Event) {
  try {
    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    isSignin.value = true
    const res = await signin({ email, password, registeredMeetups: [] })

    isSignin.value = false
    if (res?.user.role === 'authenticated') {
      store.isAuth = true

      router.push('/')
    }
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  } finally {
    isSignin.value = false
  }
}
</script>

<template>
  <div class="signin">
    <fieldset>
      <legend>Signin</legend>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="email">Email:</label>
          <input
            :disabled="isSignin"
            type="email"
            name="email"
            inputmode="email"
            id="email"
            required
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            :disabled="isSignin"
            type="password"
            name="password"
            inputmode="text"
            id="password"
          />
          <span class="error">{{ error }}</span>
        </div>
        <AppButton type="submit" :disabled="isSignin">
          <template v-if="isSignin">
            <AppSpinnerMini />
          </template>

          <template v-else> Signin </template>
        </AppButton>
      </form>
    </fieldset>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-block-start: 0.5rem;
  display: block;
}
.signin {
  display: flex;
  justify-content: center;
  margin-block-start: 3rem;
}
fieldset {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 600px;
}
legend {
  font-size: 2rem;
  font-weight: 500;
}
form {
  > div {
    margin-trim: block-start;
    margin-block-end: 1rem;
    input {
      width: 100%;
      padding: 0.7rem;
      font-size: large;
      &:disabled {
        background-color: #f3f3f3;
        cursor: not-allowed;
      }
    }
  }
}
</style>
