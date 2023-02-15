// @ts-check
import { useForm } from "react-hook-form"
import React, { useContext } from "react"
import Head from "next/head"
import { useCreateCustomer } from "medusa-react"
import { useRouter } from "next/router"
import Register from "../components/Registeration/Register"
import { PublicContext } from "../context/publicContext"

const RegisterPage = () => {
  const createCustomer = useCreateCustomer()
  const router = useRouter()
  const { setLoading } = useContext(PublicContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const onSubmit = async data => {
    const { first_name, last_name, email, password } = data
    setLoading(true)

    try {
      const res = await createCustomer.mutateAsync({
        first_name,
        last_name,
        email,
        password,
      })
      if (res.response.status === 200) router.push("/login")
    } catch (err) {
      if (err.response.status > 399 && err.response.status < 500) {
        setError("email", { message: err.response.data.message })
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="layoutContainer mt-10">
        <Register
          register={register}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </>
  )
}

export default RegisterPage
