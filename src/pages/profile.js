import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

export default function App() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
  }

 const [user, setUser] = useState({
    user_id: '',
    username: '',
    fullname: ''
 })
  useEffect(() => {
    let postData = {}
    postData.user_id = typeof window !== 'undefined' ? window.location.pathname.split('/').reverse()[0] : ''
    //postData.csrf_token = document.getElementById("csrf_token").value
    fetch(`/api/profile`, {
        method: 'POST',
        headers: {
          "content-type": `application/json`,
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if(response.status !== 200) {
            window.location.href = "/login"
            return null
        }
        else {
            return response.json()
        }
    })
    .then(resultData => {
        if(resultData !== null) {
	        console.log(resultData)
            setUser(resultData)
        }
    }) 
  }, [])

  const handleChange = event => {
    this.setState({value: event.target.value});
  }

  const handleLogout = event => {
    console.log("logout")
    fetch(`/api/logout`).then(() => window.location.href = "/login")
  }


  const handleAppUpdate = event => {
    console.log("Checking for app update...")

    let data = {}
    data.url = document.getElementById("url").value;

	fetch("/api/update", {
	    "credentials": "include",
	    "headers": {
	        'Content-Type': 'application/json',
	    },
	    "body": JSON.stringify(data),
	    "method": "POST",
	})
      .then(res => res.json())
      .then(body => {
        //console.log(`response from API:`, body)
        document.getElementById("update_msg").innerText = Number(body)
      })
  }


  const handleGitHistory = event => {
    console.log("Checking git history...")

    let data = {}
    data.file = document.getElementById("git_file").value;

	fetch("/api/git", {
	    "credentials": "include",
	    "headers": {
	        'Content-Type': 'application/json',
	    },
	    "body": JSON.stringify(data),
	    "method": "POST",
	})
      .then(res => res.json())
      .then(body => {
        //console.log(`response from API:`, body)
        document.getElementById("git_msg").innerText = body
      })
  }


  /*
  const handleTipCalc = event => {
    console.log("Checking git history...")

    let data = {}
    data.total = document.getElementById("total").value;

	fetch("/api/tip", {
	    "credentials": "include",
	    "headers": {
	        'Content-Type': 'application/json',
	    },
	    "body": JSON.stringify(data),
	    "method": "POST",
	})
      .then(res => res.json())
      .then(body => {
        //console.log(`response from API:`, body)
        document.getElementById("tip_msg").innerText = body
      })
  }
  */


  console.log({ errors })


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: `block`, width: 400 }}
    >


      <h1>Welcome, {user.fullname}!</h1>
      <h3>Profile details:</h3>

      <h4>User id: {user.user_id}</h4>

      <label htmlFor="fullname">Name</label>
      <input
        id="fullname"
        type="text"
        value={user.fullname}
        onChange={handleChange}
        style={{ display: `block`, marginBottom: 16 }}
        {...register("name", { required: true, maxLength: 80 })}
      />

      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(event)=>this.inputChangedHandler(event)}
        style={{ display: `block`, marginBottom: 16 }}
        {...register("username", { required: true, maxLength: 80 })}
      />

      <input id="csrf_token" type="hidden" value="abc-123-random-stuff-here" />
      <input type="button" value="Update Profile" />
      <input type="button" value="Logout" onClick={handleLogout} />

	  <hr/>

      <label htmlFor="username">App Update Source URL</label>
      <input
        id="url"
        type="text"
        defaultValue="http://localhost/check-update.php"
        onChange={handleChange}
        style={{ display: `block`, marginBottom: 16 }}
        {...register("url", { required: true, maxLength: 80 })}
      />

      <h5>Current version: <span id="update_msg">?</span></h5>

      <input type="button" value="Check for App Update" onClick={handleAppUpdate} />

	  <hr/>

      <label htmlFor="username">Enter filename:</label>
      <input
        id="git_file"
        type="text"
        defaultValue="README.md"
        onChange={handleChange}
        style={{ display: `block`, marginBottom: 16 }}
        {...register("git_file", { required: true, maxLength: 80 })}
      />

      <h5 id="git_msg"> </h5>

      <input type="button" value="Check Git History" onClick={handleGitHistory} />

    {/*
	  <hr/>

      <label htmlFor="username">Tip Calculator:</label>
      <input
        id="total"
        type="text"
        defaultValue="45.00"
        onChange={handleChange}
        style={{ display: `block`, marginBottom: 16 }}
        {...register("total", { required: true, maxLength: 80 })}
      />

      <h5 id="tip_msg"> </h5>

      <input type="button" value="Calculate Tip" onClick={handleTipCalc} />
    */}

    </form>
  )
}
