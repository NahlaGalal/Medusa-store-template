import { createContext, useState, useEffect } from "react"

export const PublicContext = createContext({
  isDropdownOpen: false,
  setIsDropdownOpen: () => {},
  loading: false,
  setLoading: _ => {},
  isRegistered: false,
  setIsRegistered: _ => {},
})

export const PublicProvider = ({ children, Router }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => setLoading(false)

    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)

    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return (
    <PublicContext.Provider
      value={{
        isDropdownOpen,
        setIsDropdownOpen,
        loading,
        setLoading,
        isRegistered,
        setIsRegistered
      }}
    >
      {children}
    </PublicContext.Provider>
  )
}
