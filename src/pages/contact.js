import React from "react"
import { useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => {
    fetch(`/api/contact`, {
      method: `POST`,
      body: JSON.stringify(data),
      //body: data.serialize(),
      headers: {
        "content-type": `application/json`,
      },
    })
      .then(res => res.json())
      .then(body => {
        console.log(`response from API:`, body)
        document.getElementById("contact_msg").innerHTML = body
      })
  }

  console.log({ errors })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: `block`, width: 400 }}
    >
      <h1>Contact Us!</h1>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        defaultValue="Your Name"
        style={{ display: `block`, marginBottom: 16 }}
        {...register("name", { required: true, maxLength: 80 })}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        defaultValue="test@test.com"
        style={{ display: `block`, marginBottom: 16 }}
        {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <h5 id="contact_msg"> </h5>

      <input type="submit" />
    </form>
  )
}
