import { createContext, useState, useEffect } from "react"

export const PublicContext = createContext({
  loading: false,
  setLoading: _ => {},
  isRegistered: false,
  setIsRegistered: _ => {},
  region: {},
  setRegion: _ => {},
})

export const PublicProvider = ({ children, Router }) => {
  const [loading, setLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [region, setRegion] = useState()

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
        loading,
        setLoading,
        isRegistered,
        setIsRegistered,
        region,
        setRegion,
      }}
    >
      {children}
    </PublicContext.Provider>
  )
}
