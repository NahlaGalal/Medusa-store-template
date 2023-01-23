import { createContext, useState } from "react"

export const CollectionContext = createContext({
  isDropdownOpen: false,
  setIsDropdownOpen: () => {},
})

export const CollectionProvider = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <CollectionContext.Provider
      value={{
        isDropdownOpen,
        setIsDropdownOpen,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}
