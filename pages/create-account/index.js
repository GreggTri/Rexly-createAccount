import React, {useEffect, useState} from "react";
import { useRouter } from "next/router"
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

export default function createAccount(){
  
  const router = useRouter()
  const paramNumber = router.query.phoneNumber

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
      "password": password
    }
    
    await fetch('http://localhost:8000/v1/user/createAccount', {
      method: "POST",
      headers: { "content-type": "application/json"},
      body: JSON.stringify(user)
    }).then(json => {console.log(json)}).catch(err => {console.log(err)})
  
  }
  
  return (
    <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Rexly - create Account</title>
        {//<link rel="icon" href="/favicon.ico" />
        }
      </Head>
      
      <main className="w-full max-w-md space-y-8">
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-center text-gray-900">
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
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email"
            onChange={handleEmail}
            />
            <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            autoComplete="phoneNumber"
            required
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Phone Number"
            onChange={handlePhoneNumber}
            />
            <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            onChange={handlePassword}
            />
            <button 
            className="relative flex justify-center w-full px-4 py-2 mt-5 text-base font-semibold tracking-wider text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type='submit'>Submit</button>
          </form>
        </div>
      </main>
    </div>
  )
}
