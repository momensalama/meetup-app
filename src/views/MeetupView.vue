<script setup lang="ts">
import { getMeetup } from '@/utils/apiSupabase'
import { formatDate } from '@/utils/services'
import { useRoute } from 'vue-router'
import { useOnClickOutside } from '@/composables/useOnClickOutside'
import { updateMeetup } from '@/utils/apiSupabase'
import { HuDotsVertical } from '@kalimahapps/vue-icons'
import { ref } from 'vue'
import AppSpinnerMini from '@/ui/AppSpinnerMini.vue'
import { getCurrentUser } from '@/utils/apiSupabase'
import AppButton from '@/ui/AppButton.vue'
import { userMeetupRegister } from '@/utils/apiSupabase'
import AppSpinner from '@/ui/AppSpinner.vue'
import { AkLocation } from '@kalimahapps/vue-icons'
import { UiDate } from '@kalimahapps/vue-icons'
import { deleteMeetup } from '@/utils/apiSupabase'

const route = useRoute()
const user = await getCurrentUser()
const isLoading = ref<boolean>(false)

const getMeetupsData = async () => {
  isLoading.value = true
  const meetup = await getMeetup(Number(route.params.id))
  isLoading.value = false
  return meetup
}

const meetup = await getMeetupsData()

const currentUserRegistered = user?.user_metadata.registeredMeetups.includes(meetup.id)
const isUserCreateMeetup = user?.email === meetup.email

const isOpen = ref<boolean>(false)
const modalRef = ref<HTMLElement | null>(null)
const isUpdated = ref<boolean>(false)
const isUserRegistered = ref<boolean>(currentUserRegistered)

useOnClickOutside(modalRef, () => {
  isOpen.value = false
})

const navigateBack = () => {
  history.back()
}

function handleModal() {
  isOpen.value = !isOpen.value
}

async function onUserRegister() {
  const data = await userMeetupRegister(Number(meetup.id), isUserRegistered.value)
  const isRegistered = data.includes(meetup.id)
  isUserRegistered.value = isRegistered
}

const onUpdateMeetup = async () => {
  const meetupd = {
    ...meetup,
    title: meetup.title,
    location: meetup.location,
    description: meetup.description
  }
  isUpdated.value = true
  await updateMeetup(meetupd)
  isUpdated.value = false
  isOpen.value = false
}
async function onDeleteMeetup() {
  try {
    await deleteMeetup(Number(meetup.id))
    history.back()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <section v-if="isLoading">
    <AppSpinner />
  </section>
  <section v-else>
    <div class="btns">
      <AppButton :method="navigateBack" type="button"> &larr; Back </AppButton>
      <AppButton type="button" :method="handleModal" v-if="isUserCreateMeetup">
        <HuDotsVertical />
      </AppButton>
    </div>
    <div class="meetup-image">
      <img :src="meetup.image" :alt="meetup.title" />
    </div>
    <div class="meetup-content">
      <h1>
        {{ meetup.title }}
      </h1>
      <div class="location">
        <AkLocation />
        <span> {{ meetup.location }} </span>
      </div>
      <div class="meetup-card_date">
        <UiDate />
        <span> {{ formatDate(meetup.date) }} </span>
      </div>
      <p>
        {{ meetup.description }}
      </p>
      <AppButton
        type="button"
        :status="isUserRegistered"
        class="transition"
        :method="onUserRegister"
      >
        {{ isUserRegistered ? 'Unregistered' : 'Register' }}
      </AppButton>
    </div>
    <div v-if="isOpen" class="modal-content">
      <div ref="modalRef">
        <form @submit.prevent="onUpdateMeetup">
          <div>
            <label for="title">Title:</label>
            <input
              :disabled="isUpdated"
              type="text"
              v-model="meetup.title"
              name="title"
              id="title"
              required
            />
          </div>
          <div>
            <label for="location">location:</label>
            <input
              :disabled="isUpdated"
              type="text"
              v-model="meetup.location"
              name="location"
              id="location"
              required
            />
          </div>
          <div>
            <label for="date">Date:</label>
            <input
              :disabled="isUpdated"
              type="datetime-local"
              v-model="meetup.date"
              name="date"
              id="date"
              required
            />
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea
              :disabled="isUpdated"
              id="description"
              v-model="meetup.description"
              name="description"
              required
            ></textarea>
          </div>
          <div class="edit-btns">
            <AppButton type="submit" class="transition" :disabled="isUpdated">
              <template v-if="isUpdated">
                <AppSpinnerMini />
              </template>
              <template v-else> Update </template>
            </AppButton>

            <AppButton type="button" :method="onDeleteMeetup" class="danger">
              Delete Meetup
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  margin: 1rem;
}

.modal-content {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    background-color: white;
    padding: 1rem;
    border-radius: 10px;
    width: 500px;
    form {
      .edit-btns {
        display: flex;
        gap: 1rem;
      }
      > div {
        margin-trim: block-start;
        margin-block-end: 1rem;

        label {
          font-size: 1.2rem;
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
}

.btns {
  display: flex;
  justify-content: space-between;
  margin-block-end: 1rem;

  button {
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}

.meetup-image {
  margin-block-start: 1rem;
  img {
    width: 100%;
    border-radius: 10px;
  }
}
.meetup-content h1 {
  font-size: 2.5rem;
  margin-block-end: 1rem;
}
.meetup-content p {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-block: 1rem 2rem;
}
.location,
.meetup-card_date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-block: 1rem;

  svg {
    width: 2rem;
    height: 2rem;
  }

  span {
    font-size: 1.2rem;
  }
}
</style>
