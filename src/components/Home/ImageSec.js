// @ts-check
import React from "react"

const ImageSec = () => {
  return (
    <section
      className="[ flex items-center ] min-h-screen
    [ bg-no-repeat bg-cover bg-home_section bg-fixed ]"
    >
      <div
        className="layoutContainer 
      [ py-16 px-4 my-16 ] 
      [ bg-white bg-opacity-50 ] 
      h-[calc(100%_-_80px)] 
      [ flex flex-col justify-center ]"
      >
        <h2 className="text-center text-secondary mb-8">About US</h2>
        <h3 className="mb-4 text-brand text-center">
          Lorem ipsum dolor sit amet consectetur
        </h3>

        <p className="mb-4 w-full md:w-1/2 mx-auto text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          officia excepturi. Earum quod nesciunt quia ad. Consequuntur incidunt
          nulla quis at, ducimus ullam, soluta, excepturi sapiente voluptas
          placeat eligendi possimus?
        </p>

        <p className="w-full md:w-1/2 mx-auto text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          officia excepturi. Earum quod nesciunt quia ad. Consequuntur incidunt
          nulla quis at, ducimus ullam, soluta, excepturi sapiente voluptas
          placeat eligendi possimus?
        </p>
      </div>
    </section>
  )
}

export default ImageSec
