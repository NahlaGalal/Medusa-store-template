// @ts-check
import React from "react"
import {
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid"

const GetInTouch = () => {
  return (
    <section className="layoutContainer my-16">
      <div className="flex gap-20 items-center flex-col md:flex-row">
        <div className="flex-1 relative">
          <img
            src="/contact_section.jpg"
            alt="Contact illusturation"
            className="rounded-xl max-h-80 md:max-h-none"
          />

          <span className="absolute bg-lightGrey w-full h-full -bottom-10 -right-10 -z-10 rounded-xl"></span>
        </div>

        <div className="flex-[2] mt-0 md:mt-16">
          <h2 className="text-secondary w-100 md:w-1/2 mb-8 md:mb-16 text-2xl">
            Get in touch with us & let's talk
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-bold mb-2 flex gap-1">
                <ClockIcon width={20} />
                Office Hours
              </p>
              <p className="text-darkGrey pl-6">Sunday to Thursday</p>
              <p className="text-darkGrey pl-6">9:00 am to 5:00 pm</p>
            </div>

            <div>
              <p className="font-bold mb-2 flex gap-1">
                <MapPinIcon width={20} />
                Our Address
              </p>
              <p className="text-darkGrey pl-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolorum mollitia eius
              </p>
            </div>

            <div>
              <p className="font-bold mb-2 flex gap-1">
                <PhoneIcon width={20} />
                Get in Touch
              </p>
              <p className="text-darkGrey pl-6">+1-264-124-6443</p>
              <p className="text-darkGrey pl-6">+1-264-124-6443</p>
            </div>

            <div>
              <p className="font-bold mb-2 flex gap-1">
                <EnvelopeIcon width={20} />
                Email address
              </p>
              <p className="text-darkGrey pl-6">elnagar@gmail.com</p>
              <p className="text-darkGrey pl-6">elnagar2@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouch
