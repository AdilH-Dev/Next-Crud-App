import Link from "next/link"
import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { create } from './_app';
import Head from "next/head";
import { toast } from "react-toastify";

export default function login() {

    const router = useRouter()
    const { setState } = useContext(create)
    const [login, setlogin] = useState({ email: "", password: "" })
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const [token, setToken] = useState(null)

    const data = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }

    const signIn = (e) => {
        e.preventDefault()
        setError(validation(login))
        setIsSubmit(true)
    }

    const validation = (inpval) => {
        let error = {}
        const userGet = JSON.parse(localStorage.getItem("user"))

        if (!inpval.email) {
            error.email = "Email is requried"
        } else if (userGet) {
            const emailMatch = userGet.some(e => e.email === inpval.email)
            if (!emailMatch) {
                error.email = "Email not found sign up"
            } else {
                setToken(emailMatch)
            }
        }

        if (!inpval.password) {
            error.password = "Password is requried"
        } else if (userGet) {
            const passwordMatch = userGet.some(e => e.password === inpval.password)
            if (!passwordMatch) {
                error.password = "Password not match"
            }
        }
        return error
    }

    useEffect(() => {

        if (Object.keys(error).length === 0 && isSubmit) {
            const userGet = JSON.parse(localStorage.getItem("user"))
            if (userGet === null) {
                router.push("/signUp")
                toast("user not found please sign up")
            } else {
                localStorage.setItem("token", JSON.stringify(token));
                setState(token)
                router.push("/home")
            }
        }
    }, [error]);

    return (
        <>
            <Head>
                <title>Sign In</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <form className="col-4 mx-auto mt-5" onSubmit={signIn}>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">Email</label>
                    <input type="email" id="loginName" className="form-control" name="email" value={login.email} onChange={data} />
                </div>
                {<p className="text-danger">{error.email}</p>}

                {/* 
                <!-- Password input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                    <input type="password" id="loginPassword" className="form-control" name="password" value={login.password} onChange={data} />
                </div>
                {<p className="text-danger">{error.password}</p>}


                {/* <!-- 2 column grid layout --> */}
                {/* <div className="row mb-4">
                    <div className="col-md-6 d-flex justify-content-center"> */}
                        {/* <!-- Checkbox --> */}
                        {/* <div className="form-check mb-3 mb-md-0">
                            <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
                            <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center"> */}
                        {/* <!-- Simple link --> */}
                        {/* <a href="#">Forgot password?</a>
                    </div>
                </div> */}

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary w-100 btn-block mb-4">Sign in</button>

                {/* <!-- Register buttons --> */}
                <div className="text-center">
                    <p>Not a member? <Link href="/signUp">Register</Link></p>
                </div>
            </form>
        </>
    )
}
