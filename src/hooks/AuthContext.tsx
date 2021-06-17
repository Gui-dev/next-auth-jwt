import React, { createContext, useContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from '../services/auth'
import { api } from '../services/api'

interface AuthContextProps {
  isAuthenticated: boolean
  user: IUserProps | null
  signIn: (data: ISignInData) => void
}

interface ISignInData {
  email: string
  password: string
}

interface IUserProps {
  name: string
  email: string
  avatar_url: string
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUserProps | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { '@nextauth:token': token } = parseCookies()

    if (token) {
      recoverUserInformation()
        .then(response => setUser(response.user))
    }
  }, [])

  const signIn = async ({ email, password }: ISignInData): Promise<void> => {
    const { user, token } = await signInRequest({ email, password })

    setCookie(undefined, '@nextauth:token', token, {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    api.defaults.headers.Authorization = `Bearer ${token}`

    setUser(user)

    Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      signIn
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}