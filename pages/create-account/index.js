import React, {useEffect, useState} from "react";
import { useRouter } from "next/router"
import Head from 'next/head'

export default function createAccount(){
  
  const router = useRouter()

  const [responseError, setError] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phoneNumber, setNumber] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleEmail = event  => {
    setEmail(event.target.value)
  }
  const handlePhoneNumber = event  => {
    setNumber(event.target.value)
  }
  const handlePassword = event  => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      "email": email,
      "phoneNumber": phoneNumber,
      "password": password,
      "fromPhoneLink": false
    }
    
    let response = await fetch(process.env.MAIN_SERVER, {
      method: "POST",
      headers: { "content-type": "application/json"},
      body: JSON.stringify(user)
    }).then(json => {console.log(json)}).catch(err => {console.log(err)})
    
    //error handling
    if(response.status_code == 400) {
      if(response == "[400 Error]: Bad Request"){
        setError("Please fill out all the fields in the form")
      }
      else {
        setError("A user with this email already exists")
      }
      
    }else if(response.status_code == 500){
      setError("Sorry, something went wrong with our servers. Please try again.")
    }
  }
  
  return (
    <div className="flex justify-center h-full px-8 py-10 sm:px-6 lg:px-8 bg-cream">
      <Head>
        <title>Rexly - create Account</title>
        <link rel="icon" href="/RexlyIcon.svg"/>
        
      </Head>
      
      <div className="w-full h-full max-w-md space-y-6">
        <svg className="block mx-auto" width="200" height="200">
          <image href="/RexlyLogoTransparent.svg" rel="Logo" x="0" y="0" width="200" height="200" />
        </svg>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-center text-darkGreen">
          Create your Account
        </h1>
        <div className="mt-8 space-y-6">
          <form onSubmit={handleSubmit}>
            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none border-lightGreen rounded-t-md focus:z-10 focus:border-darkGreen focus:outline-none focus:ring-darkGreen sm:text-sm"
            placeholder="Email"
            onChange={handleEmail}
            />
            <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            autoComplete="phoneNumber"
            required
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none border-lightGreen focus:z-10 focus:border-darkGreen focus:outline-none focus:ring-darkGreen sm:text-sm"
            placeholder="Phone Number"
            onChange={handlePhoneNumber}
            />
            <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none border-lightGreen rounded-b-md focus:z-10 focus:border-darkGreen focus:outline-none focus:ring-darkGreen sm:text-sm"
            placeholder="Password"
            onChange={handlePassword}
            />
            {responseError ? <span className="text-red-500">{responseError}</span> : <></>}
            <button 
            className="relative flex justify-center w-full px-4 py-2 mt-5 text-base font-semibold tracking-wider text-white border border-transparent rounded-md bg-darkGreen group hover:bg-darkGreen-700 focus:outline-none focus:ring-2 focus:ring-lightGreen focus:ring-offset-2"
            type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
