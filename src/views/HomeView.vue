<script setup lang="ts">
import AppLink from '@/ui/AppLink.vue'
import AppSpinner from '@/ui/AppSpinner.vue'
import { getMeetups } from '@/utils/apiSupabase'
import { formatDate } from '@/utils/services'
import { ref } from 'vue'
import { AkLocation } from '@kalimahapps/vue-icons'
import { UiDate } from '@kalimahapps/vue-icons'

const isLoading = ref(false)

const getMeetupsData = async () => {
  isLoading.value = true
  const meetups = await getMeetups()
  isLoading.value = false
  return meetups
}

const meetups = await getMeetupsData()
</script>

<template>
  <section aria-label="meetups section">
    <div v-if="meetups.length">
      <AppSpinner v-if="isLoading" />
      <div class="meetups-container" v-else>
        <div class="meetup-card" v-for="meetup in meetups" :key="meetup.id">
          <div class="meetup-card__image">
            <img :src="meetup.image" :alt="meetup.title" />
          </div>
          <div class="meetup-card__content">
            <h1>{{ meetup.title }}</h1>

            <div class="location">
              <AkLocation />
              <span> {{ meetup.location }} </span>
            </div>
            <div class="meetup-card_date">
              <UiDate />
              <span> {{ formatDate(meetup.date) }} </span>
            </div>
            <p>
              {{
                meetup.description.length > 100
                  ? `${meetup.description.slice(0, 100)}...`
                  : meetup.description
              }}
            </p>
            <AppLink text="view details &rarr;" :path="`/meetup/${meetup.id}`" />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!meetups.length" class="no-meetups">
      <div>
        <h1>No meetups found</h1>
        <p>Would you like to create one?</p>
        <AppLink text="create new meetup &rarr;" path="/new-meetup" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.meetups-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin: 2rem;
}

.meetup-card {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}

.meetup-card__image {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

.meetup-card__content {
  flex: 1;
  h1 {
    font-size: 1.5rem;
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
}

.meetup-card__content p {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-block: 1rem;
  max-width: 500px;

  @media screen and (max-width: 992px) {
    & {
      max-width: 100%;
    }
  }
}
.no-meetups {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-start: 4rem;
  padding: 1rem;
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;
    margin-block: 1rem;
  }
}
</style>
