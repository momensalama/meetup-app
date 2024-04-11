import type { AuthProps } from '@/types'
import { supabase } from './supabase'

export async function signup({ email, password }: AuthProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        registeredMeetups: []
      }
    }
  })

  if (error) throw new Error(error.message)

  return data
}

export async function signin({ email, password }: AuthProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error.message)

  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}
