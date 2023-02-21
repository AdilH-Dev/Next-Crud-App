import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { create } from './_app';


export default function Edit() {

    const token = useContext(create)
    const router = useRouter()
    const state = router.query.data
    const [data, setData] = useState({ first: "", last: "", email: "" })

    useEffect(() => {
        const get = JSON.parse(localStorage.getItem("update"))
        const state = router.query.data
        setData(get[state])
    }, [])

    const data_change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const update = (e) => {
        e.preventDefault()
        const get = JSON.parse(localStorage.getItem("update") || "[]")
        get.splice(state, 1, data)
        localStorage.setItem("update", JSON.stringify(get));
        setData({ first: "", last: "", email: "" })
        router.push("/home")
    }

    return (
        <>
            <Head>
                <title>EDIT</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {token.state &&
                <div className="form_parent">
                    <form onSubmit={update}>
                        <label htmlFor="first">First Name :</label><br />
                        <input type="text" onChange={data_change} value={data?.first} name="first" required /><br />

                        <label htmlFor="last">Last Name :</label><br />
                        <input type="text" onChange={data_change} value={data?.last} name="last" required /><br />

                        <label htmlFor="email">Email :</label><br />
                        <input type="email" onChange={data_change} value={data?.email} name="email" required /><br />
                        <button type='submit' className="button mt-3">Update</button>
                    </form>
                </div>
            }
        </>
    )
}
