import React from "react"
import { useForm } from "react-hook-form"
import "../styles/global.css"


export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => {
    fetch(`/api/login`, {
      method: `POST`,
      body: JSON.stringify(data),
      headers: {
        "content-type": `application/json`,
      },
    })
      .then(res => res.json())
      .then(body => {
        console.log(`response from API:`, body)

        if(body.error === 1) {
            document.getElementById("error").innerText = body.msg
        }
        else {
		    window.location.href = `/profile/${body.user_id}`
        }

      })
	  //.then(() => 
		//window.location.href = "/profile" )
		//.catch(error => alert(error))
  }

  console.log({ errors })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: `block`, width: 400 }}
    >
      <label htmlFor="first-name">Username</label>
      <input
        id="username"
        type="text"
        defaultValue="user@test.com"
        style={{ display: `block`, marginBottom: 16 }}
        {...register("username", { required: true, maxLength: 80 })}
      />

      <label htmlFor="last-name">Password</label>
      <input
        id="password"
        type="password"
        defaultValue="my_secret_password"
        style={{ display: `block`, marginBottom: 16 }}
        {...register("password", { required: true, maxLength: 100 })}
      />

      <h5 id="error"> </h5>

      <input type="submit" value="Login" />
    </form>
  )
}
