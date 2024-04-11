export interface AppButtonProps {
  type: 'button' | 'submit' | 'reset'
  method?: () => void
  disabled?: boolean
  isLoading?: boolean
  status?: boolean
}

export interface AppLinkProps {
  text: string
  path: string
}

export interface Meetup {
  image: string
  id?: string
  title: string
  description: string
  location: string
  date: string
  email: string | undefined
}

export interface State {
  isAuth: boolean
}

export interface FormData {
  title: string
  image: string
  location: string
  description: string
  date: string
  email: string | undefined
}

export interface AuthProps {
  email: string
  password: string
  registeredMeetups?: number[]
}
