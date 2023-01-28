import React, {useEffect, useState} from "react";
import { useRouter } from "next/router"
import Image from 'next/image';
import axios from 'axios'
import rexlyLogo from '../../public/RexlyLogoTransparent.svg'


export default function createAccount(){
  
  const router = useRouter()

  const [responseError, setError] = React.useState("")
  const [responseSuccess, setSuccess] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phoneNumber, setNumber] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleEmail = event  => {
    setEmail(event.target.value)
  }

  const handlePassword = event  => {
    setPassword(event.target.value)
  }

  function isNumberKey(event) {
    event.preventDefault()
    let input = event.target.value
    const pattern = /^[0-9]*$/;

    if(pattern.test(input)){
      setNumber(event.target.value)
      return true
    }else{
      setNumber(phoneNumber)
      return false
    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      "email": email,
      "phoneNumber": phoneNumber,
      "password": password,
      "fromPhoneLink": false
    }
    
    try{
      let response = await axios.post('/api/createAccount', user)
      console.log(response.data);
      setSuccess(response.data)
    }
    catch(error){
      setSuccess('')
      console.log(error)
      
      setError("Sorry, something went wrong with our servers. Please try again.")

      if(error.response.data == "[400 Error]: Bad Request"){
        setError("Please fill out all the fields in the form")
      }else if( error.response.data== "[400 Error]: User already exists"){
        setError("A user with this email may already exists")
      }
    }
  }
  
  return (
    <div className="flex justify-center h-full px-8 py-10 sm:px-6 lg:px-8 bg-cream">
      <div className="w-full h-full max-w-md space-y-6">
        <Image src={rexlyLogo} alt="Logo" className="block mx-auto" width="200" height="200"/>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-center text-darkGreen">
          Create your Account
        </h1>
        <h3 className="text-base font-medium tracking-tight text-center text-green-600 underline">
          Please Note: We are only allowing US Numbers at this time.
        </h3>
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
            minLength={10}
            maxLength={10}
            required
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none border-lightGreen focus:z-10 focus:border-darkGreen focus:outline-none focus:ring-darkGreen sm:text-sm"
            placeholder="Phone Number"
            onChange={isNumberKey}
            value={phoneNumber}
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
            {responseSuccess ? <span className="text-green-500">{responseSuccess}</span> : <></>}
            <button 
            className="relative flex justify-center w-full px-4 py-2 mt-5 text-base font-semibold tracking-wider text-white border border-transparent rounded-md bg-darkGreen group hover:bg-darkGreen-700 focus:outline-none focus:ring-2 focus:ring-lightGreen focus:ring-offset-2"
            type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}