import { createContext, useState, useEffect } from "react"

export const RegionContext = createContext({
  region: {},
  setRegion: _ => {},
})

export const RegionProvider = ({ children }) => {
  const [region, setRegion] = useState()

  return (
    <RegionContext.Provider
      value={{
        region,
        setRegion,
      }}
    >
      {children}
    </RegionContext.Provider>
  )
}
