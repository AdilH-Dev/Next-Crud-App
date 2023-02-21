import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function signup() {

  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", password: "", term: "" });
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const data = (e) => {
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    setUser({ ...user, [target.name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    setError(validation(user));
    setIsSubmit(true);
  };

  const validation = (inpval) => {

    const error = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const userGet = JSON.parse(localStorage.getItem("user"));

    if (!inpval.name) {
      error.name = "Name is required!";
    }
    if (!inpval.email) {
      error.email = "email is required!";
    } else if (!regexEmail.test(inpval.email)) {
      error.email = "This is not a valid email format!";
    } else if (userGet) {
      const exit = userGet.some((e) => e.email === inpval.email);
      if (exit) {
        error.email = "Email already exits use different email or sign In";
      }
    }
    if (!inpval.password) {
      error.password = "password is required!";
    } else if (!regexPass.test(inpval.password)) {
      error.password =
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:";
    }
    if (!inpval.term || inpval.term === false) {
      error.term = "Please read terms and conditions";
    }
    return error;
  };

  useEffect(() => {

    if (Object.keys(error).length === 0 && isSubmit) {
      const userGet = JSON.parse(localStorage.getItem("user"));

      if (userGet === null) {
        localStorage.setItem("user", JSON.stringify([user]));
        router.push("/");
      } else {
        localStorage.setItem("user", JSON.stringify([...userGet, user]));
        router.push("/");
      }
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className="col-6 mx-auto mt-5" onSubmit={submit}>
        {/* <!-- Name input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerName">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            className="form-control"
            name="name"
            value={user.name}
            onChange={data}
          />
        </div>
        <p className="text-danger">{error.name}</p>

        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerEmail">
            Email
          </label>
          <input
            type="text"
            id="registerEmail"
            className="form-control"
            name="email"
            value={user.email}
            onChange={data}
          />
        </div>
        <p className="text-danger">{error.email}</p>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
          <input
            type="text"
            id="registerPassword"
            className="form-control"
            name="password"
            value={user.password}
            onChange={data}
          />
        </div>
        <p className="text-danger">{error.password}</p>

        {/* <!-- Repeat Password input --> */}
        {/* <div className="form-outline mb-4">
          <label className="form-label" htmlFor="registerRepeatPassword">Confirm password</label>
          <input type="password" id="registerRepeatPassword" className="form-control" name="confirmPassword" onChange={data} required />
        </div> */}

        {/* <!-- Checkbox --> */}
        <div className="form-check d-flex mb-4">
          <input className="form-check-input me-2" type="checkbox" value={user.term} id="registerCheck" name="term" onChange={data}

            aria-describedby="registerCheckHelpText" />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>
        <p className="text-danger">{error.term}</p>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary w-100 btn-block mb-3">
          Sign Up
        </button>
        <Link href="/">
          <h5 className="text-center text-primary">
            Already have an account ?
          </h5>
        </Link>
      </form>
    </>
  );
}
