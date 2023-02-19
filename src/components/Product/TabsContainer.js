// @ts-check
import React, { useState } from "react"
import translations from "../../translations/product.json"

const TabsContainer = ({ description, locale }) => {
  const [currentSection, setCurrentSection] = useState("description")

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex gap-4 bg-lightGrey border-b border-b-darkGrey">
        <div className="layoutContainer">
          <button
            onClick={() => setCurrentSection("description")}
            className={`buttonCta py-5 h-auto border-0 rounded-none border-b-secondary ${
              currentSection === "description" ? "border-b" : "border-b-0"
            }`}
          >
            {translations[locale].description}
          </button>
        </div>
      </header>

      <div className="layoutContainer pb-4">
        {currentSection === "description" ? (
          <p
            dangerouslySetInnerHTML={{
              __html: description.replaceAll("\n", "<br />"),
            }}
          />
        ) : undefined}
      </div>
    </div>
  )
}

export default TabsContainer
