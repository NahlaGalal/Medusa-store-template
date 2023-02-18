// @ts-check
import React, { useContext } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import Login from "../components/Registeration/Login"
import { client } from "../utils/client"
import { PublicContext } from "../context/publicContext"
import { getTokenCookie } from "../utils/cookie"

const LoginPage = ({ cartId }) => {
  const router = useRouter()
  const { setLoading, setIsRegistered } = useContext(PublicContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const onSubmit = async data => {
    const { email, password } = data
    setLoading(true)

    try {
      const res = await client.auth.authenticate({
        email,
        password,
      })

      if (res.response.status === 200) {
        localStorage.setItem("id", res.customer.id)

        if (cartId)
          await client.carts.update(cartId, { customer_id: res.customer.id })
        setIsRegistered(true)
        if (router.asPath === "/not-loggedin") router.push("/shipping")
        else router.push("/")
      }
    } catch (err) {
      if (err.response.status > 399 && err.response.status < 500) {
        setError("email", {
          message: err.response.data.message || "Wrong email or password",
        })
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="layoutContainer mt-10">
        {router.asPath === "/not-loggedin" && (
          <p className="text-secondary p-2 bg-lightGrey mb-3 rounded text-sm flex gap-1">
            <ExclamationTriangleIcon width={14} />
            You must login first
          </p>
        )}
        <Login
          register={register}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </>
  )
}

export async function getServerSideProps({ req }) {
  let cartId = getTokenCookie(req, "cart_id") || null

  return { props: { cartId } }
}

export default LoginPage
