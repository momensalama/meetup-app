<script setup lang="ts">
import AppButton from '@/ui/AppButton.vue'
import AppLink from '@/ui/AppLink.vue'
import AppSpinnerMini from '@/ui/AppSpinnerMini.vue'
import { getCurrentUser } from '@/utils/apiSupabase'
import { createMeetup } from '@/utils/apiSupabase'
import { ref } from 'vue'

const isSubmitted = ref<boolean>(false)
const isCreating = ref<boolean>(false)
const imgUrl = ref<string>('')
const dateTime = ref<string>('')

async function handleSubmit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)
  const user = await getCurrentUser()

  const meetupData = {
    title: formData.get('title') as string,
    image: imgUrl.value,
    location: formData.get('location') as string,
    description: formData.get('description') as string,
    date: dateTime.value,
    email: user?.email
  }

  try {
    isCreating.value = true
    await createMeetup(meetupData)
    isSubmitted.value = true
  } catch (err) {
    console.error(err)
  } finally {
    isCreating.value = false
  }

  // Reset the form inputs
  const formElement = event.target as HTMLFormElement
  formElement.reset()
  imgUrl.value = ''
  dateTime.value = ''
}

function resetForm() {
  isSubmitted.value = false
}

function onUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files
  const fileName = (event.target as HTMLInputElement).files?.[0].name

  if (fileName && fileName.lastIndexOf('.') <= 0) {
    return alert('Invalid file type')
  }
  const fileReader = new FileReader()

  fileReader.onload = () => {
    imgUrl.value = fileReader.result as string
  }
  if (files) {
    fileReader.readAsDataURL(files[0])
  }
}
</script>
<template>
  <section>
    <div v-if="isSubmitted" class="message">
      <p>Meetup created successfully</p>
      <div class="message-btns">
        <AppButton :onClick="resetForm" type="button"> Create another </AppButton>
        <AppLink text="Go to meetups" path="/" />
      </div>
    </div>
    <div class="new-meetup" v-else>
      <h1>create new meetup</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">Title:</label>
          <input :disabled="isCreating" required type="text" name="title" id="title" />
        </div>
        <div>
          <label for="image">upload image</label>
          <input
            :disabled="isCreating"
            required
            type="file"
            name="image"
            id="image"
            ref="fileInput"
            accept="image/*"
            @change="onUpload"
          />

          <img v-if="imgUrl" :src="imgUrl" alt="uploaded image" />
        </div>
        <div>
          <label for="location">location:</label>
          <input :disabled="isCreating" required type="text" name="location" id="location" />
        </div>
        <div>
          <label for="date">Date:</label>
          <input
            :disabled="isCreating"
            required
            type="datetime-local"
            v-model="dateTime"
            name="data"
            id="date"
          />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea :disabled="isCreating" required id="description" name="description"></textarea>
        </div>

        <AppButton type="submit" class="transition" :disabled="isCreating">
          <template v-if="isCreating">
            <AppSpinnerMini />
          </template>
          <template v-else> create Meetup </template>
        </AppButton>
      </form>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
}
.message {
  margin-block-start: 5rem;
  p {
    font-size: 2rem;
    font-weight: 500;
    margin-block-end: 1.5rem;
  }
  .message-btns {
    display: flex;
    gap: 1rem;
  }
}
.new-meetup {
  margin-block-start: 2rem;
  padding: 1rem;
  h1 {
    font-size: 3rem;
    margin-block-end: 1rem;
  }
  form {
    > div {
      margin-trim: block-start;
      margin-block-end: 1rem;
      img {
        height: 150px;
      }
      #calendar-12h {
        width: 100%;
      }
      #image {
        padding-inline-start: 0;
      }
      input,
      textarea {
        width: 100%;
        padding: 0.7rem;
        font-size: large;

        &:disabled {
          background-color: #f3f3f3;
          cursor: not-allowed;
        }
      }
      textarea {
        resize: vertical;
      }
    }
  }
}
</style>
