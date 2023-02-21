import '@/styles/globals.css'
import Head from 'next/head'
import Navbar from '@/components/navbar'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import { useState ,useEffect} from 'react'
import { createContext } from 'react'
import { useRouter } from 'next/router'
import {ToastContainer } from "react-toastify";


export const create=createContext({})

export default function App({ Component, pageProps }) {
  
  const router=useRouter()
  const [token,setToken] = useState (null)

  useEffect (() => {
    const test = JSON.parse(localStorage.getItem("token" || null))
    if (!test) {
    router.push("/")
    } else {
      setToken(test)
    }
  },[])

  return (
    <>
      <create.Provider value={{state:token,setState:setToken}}>   
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
      </Head>
      <Navbar />
      <ToastContainer />
      <Component {...pageProps} />
      </create.Provider>
    </>
  )
}
