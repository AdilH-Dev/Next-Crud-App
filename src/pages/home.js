import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { create } from './_app';


export default function Home() {

  const { state } = useContext(create)
  const [save, setSave] = useState([])
  const [id, setId] = useState(null)

  useEffect(() => {
    const get = JSON.parse(localStorage.getItem("update") || "[]")
    setSave(get)
  }, []);


  const del = () => {
    save.splice(id, 1)
    localStorage.setItem("update", JSON.stringify(save));
    const remove = JSON.parse(localStorage.getItem("update"))
    setSave(remove)
  }

  const clear = () => {
    localStorage.clear()
    setSave([])
  }

  const [searchData, setsearchData] = useState("")

  const search = (e) => {
    const back = e.target.value
    setsearchData(back.toLowerCase())
  }

  const active = (id) => {
    save[id].check = "false"
    localStorage.setItem("update", JSON.stringify(save));
    const active = JSON.parse(localStorage.getItem("update") || "[]")
    setSave(active)
  }

  const inactive = (id) => {
    save[id].check = "true"
    localStorage.setItem("update", JSON.stringify(save));
    const active = JSON.parse(localStorage.getItem("update") || "[]")
    setSave(active)
  }



  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {state &&
        <main>
          <div className='table-parent'>
            <h2 className='text-center'> Employee List </h2>
            <div className='table-heading-parent'>
              <button onClick={clear} type="button" className="btn btn-primary"> Clear all </button>
              <input type="email" value={searchData} className="form-control mx-5 w-25" onChange={search} placeholder='search by email' aria-label="Text input with dropdown button"></input>
              <Link href="/add">
                <button type="button" className="btn btn-primary"> Add Employee </button>
              </Link>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
                {save.filter((e) => {
                  if (searchData === "") {
                    return e
                  } else if (
                    e.email.toLowerCase().includes(searchData)
                  ) {
                    return e
                  }
                })
                  .map((e, id) => {
                    return (
                      <tr key={id}>
                        <td>{e.first}</td>
                        <td>{e.last}</td>
                        <td>{e.email}</td>
                        <td>
                          <Link href={{ pathname: "/edit", query: { data: id } }}>
                            <button type="button" className="btn btn-primary">Edit</button>
                          </Link>
                          <button type="button" className="btn btn-primary ms-4" onClick={() => setId(id)} data-toggle="modal" data-target="#exampleModal">Delete</button>
                          {e.check === "true" ?
                            <button type="button" onClick={() => active(id)} className="btn btn-success ms-4">Active</button> :
                            <button type="button" onClick={() => inactive(id)} className="btn btn-danger ms-4">In Active</button>
                          }
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Are you sure want to delete it ? </h5>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={del} className="btn btn-secondary" data-dismiss="modal">Yes</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal">No</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    </>
  )
}
