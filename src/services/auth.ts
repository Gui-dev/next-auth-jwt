import { v4 as uuid } from 'uuid'

interface ISignInRequestData {
  email: string
  password: string
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export const signInRequest = async (data: ISignInRequestData) => {
  await delay()

  return {
    user: {
      name: 'Gui Silva',
      email: 'gui@email.com',
      avatar_url: 'https://github.com/Gui-dev.png'
    },
    token: uuid()
  }
}

export const recoverUserInformation = async () => {
  await delay()

  return {
    user: {
      name: 'Gui Silva',
      email: 'gui@email.com',
      avatar_url: 'https://github.com/Gui-dev.png'
    }
  }
}