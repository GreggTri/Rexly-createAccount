import React, {useEffect, useState} from "react";
import { useRouter } from "next/router"
import Image from 'next/image';

import rexlyLogo from '../../../public/RexlyLogoTransparent.svg'

export default function createAccountWithPhoneNumber(){
  
  const router = useRouter()
  const paramNumber = router.query.phoneNumber

  const [responseError, setError] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [Value, setValue] = useState('');

  const handleEmail = event  => {
    setEmail(event.target.value)
  }
  const handlePassword = event  => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    // call a function to set the initial value
    isNumberValid(paramNumber);
  }, [paramNumber]);

  function isNumberValid(paramNumber) {
    const pattern = /^[+0-9]*$/;
    console.log(paramNumber)

    if(pattern.test(paramNumber)){
      console.log("this returns the number")
      return setValue(paramNumber)
    }else{
      console.log("this does not");
      return setValue("")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      "email": email,
      "phoneNumber": paramNumber,
      "password": password,
      "fromPhoneLink": true
    }
    
    let response = await fetch(process.env.MAIN_SERVER_CREATE_ACC, {
      method: "POST",
      headers: { "content-type": "application/json"},
      body: JSON.stringify(user)
    })
    
    //error handling
    if(response.status != 201) {
      if(response.status == 500){
        setError("Sorry, something went wrong with our servers. Please try again.")
      }
      else if(response.body == "[400 Error]: Bad Request" && response.status == 400){
        setError("Please fill out all the fields in the form")
      }
      else if(response.status == 400){
        setError("A user with this email may already exists")
      }
      else {
        setError("Sorry, something went wrong with our servers. Please try again.")
      } 
    }
  }
  
  return (
    <div className="flex justify-center h-full px-8 py-10 sm:px-6 lg:px-8 bg-cream">
      <div className="w-full h-full max-w-md space-y-6">
        <Image src={rexlyLogo} alt="logo" className="block mx-auto" width="200" height="200"/>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-center text-darkGreen">
          Create your Account
        </h1>
        <h3 className="text-base font-medium tracking-tight text-center text-green-600 underline ">
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
            minLength={12}
            maxLength={12}
            defaultValue={Value}
            autoComplete="phoneNumber"
            required
            className="relative block w-full px-3 py-2 text-gray-900 bg-gray-100 border rounded-none appearance-none cursor-not-allowed border-lightGreen focus:z-10 focus:border-darkGreen focus:outline-none focus:ring-darkGreen sm:text-sm"
            placeholder="Phone Number"
            disabled
            />
            <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-darkGreen focus:outline-none focus:ring-darkGreen sm:text-sm"
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
