import Link from "next/link"
import { useContext } from "react";
import { create } from '../pages/_app';

export default function Navbar() {

  const {state,setState} = useContext(create)
  
  const signOut = () => {

    localStorage.removeItem("token")
    setState(null)
  }

  return (
    <>
      <div className='Navbar container-fluid'>
        <div className="row ">
          <div className="col-8 py-3">
            <h2 className="">NEXT JS CRUD APP</h2>
          </div>
          <div className="col-4 py-3">
            {!state ?
            <div>
            <Link href="/">
            <button type="button" className="btn btn-danger"> Sign In </button>
            </Link>
            <Link href="/signUp">
            <button type="button" className="btn btn-danger ms-3"> Sign Up </button>
            </Link>
            </div>:
             <Link href="/">
             <button type="button" onClick={signOut} className="btn btn-danger"> Sign out </button>
             </Link>
            }
          </div>
        </div>
      </div>

    </>
  )
}