import { useState, createContext } from "react"

type UserDataProviderType = {
  setUserType: (userType: string) => void
  userType: string | null
  setTokenData: (token: string) => void
  userToken: string | null
  setUserName: (username: string) => void
  userName: string | null
}

export const UserContext = createContext<UserDataProviderType>({
  setUserType: () => {},
  userType: null,
  setTokenData: () => {},
  userToken: null,
  setUserName: () => {},
  userName: null
})

export const UserDataProvider = ({children}) => {
  const [userType, setUserType] = useState(null)
  const [userToken, setTokenData] = useState(null)
  const [userName, setUserName] = useState(null)

  const setUserData = (userType: string, username: string) => {
    setUserType(userType)
    setUserName(username)
  }

  const setUserToken = (token: string) => {
    setTokenData(token)
  }

  return (
    <UserContext.Provider value={{userType, setUserType, userToken, setTokenData, userName, setUserName}}>{children}</UserContext.Provider>
  )
}