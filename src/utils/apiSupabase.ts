import type { Meetup } from '@/types'
import { supabase } from './supabase'

export async function createMeetup(meetup: Meetup): Promise<Meetup> {
  const { data, error } = await supabase
    .from('meetups')
    .insert([{ ...meetup }])
    .single()

  if (error) throw new Error(error.message)

  return data
}

export async function getMeetups(): Promise<Meetup[]> {
  const { data, error } = await supabase.from('meetups').select('*')

  if (error) throw new Error(error.message)

  return data
}

export async function getMeetup(id: number): Promise<Meetup> {
  const { data, error } = await supabase.from('meetups').select().eq('id', id).single()

  if (error) throw new Error(error.message)

  return data
}

export async function updateMeetup(meetup: Meetup) {
  const { error } = await supabase
    .from('meetups')
    .update({ ...meetup })
    .eq('id', meetup.id)

  if (error) throw new Error(error.message)
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  return data?.user
}

export async function userMeetupRegister(meetupId: number, registerMeetup: boolean) {
  const { data } = await supabase.auth.getUser()

  const registrations: number[] = data?.user?.user_metadata?.registeredMeetups || []

  const updatedRegistrations = registerMeetup
    ? registrations.filter((id: number) => id !== meetupId)
    : [...registrations, meetupId]

  const { data: updatedUserData, error } = await supabase.auth.updateUser({
    data: {
      registeredMeetups: updatedRegistrations
    }
  })

  if (error) throw new Error(error.message)

  const updatedMeetups = updatedUserData.user.user_metadata.registeredMeetups || []

  return updatedMeetups
}

export async function deleteMeetup(id: number) {
  const { error } = await supabase.from('meetups').delete().eq('id', id)

  if (error) throw new Error(error.message)
}
