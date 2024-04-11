import { defineStore } from 'pinia'
import type { State } from '@/types'

export const useStore = defineStore('useStore', {
  state: () =>
    <State>{
      isAuth: false
    },
  persist: true
})
