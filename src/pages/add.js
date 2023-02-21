import React from 'react'
import { useState,useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { create } from './_app';


export default function Add() {

  const token = useContext(create)
  const router = useRouter()
  const [data, setData] = useState({ first: "", last: "", email: "", check: "true" })

  const data_change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submit = (event) => {
    event.preventDefault()
    const get = JSON.parse(localStorage.getItem("update"))

    if (get === null) {
      localStorage.setItem("update", JSON.stringify([data]));
    }
    else {
      localStorage.setItem("update", JSON.stringify([...get, data]));
    }
    setData({ first: "", last: "", email: "" })
    router.push("/home")
  }

  return (
    <>
      <Head>
        <title>ADD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {token.state && 
      <div className="form_parent">
        <form onSubmit={submit}>
          <label htmlFor="first">First Name :</label><br />
          <input type="text" onChange={data_change} id='first' value={data.first} name="first" required /><br />

          <label htmlFor="last">Last Name :</label><br />
          <input type="text" onChange={data_change} id='last' value={data.last} name="last" required /><br />

          <label htmlFor="email">Email :</label><br />
          <input type="email" onChange={data_change} id='email' value={data.email} name="email" required />
          <div className='bottom_btn'>
            <Link href="/home">
              <button className='button back'>Back</button>
            </Link>
            <button type='submit' className="button">Add Employes</button>
          </div>
        </form>
      </div>
      }
    </>
  )
}
