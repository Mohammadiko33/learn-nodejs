import React, { useEffect, useState, type ChangeEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "./Components/Modal";
export type Che = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
const BASE_API = "http://localhost:3000/users/";

interface Iform {
  username: string,
  email: string,
  password: string;
}

export interface IformId extends Iform {
  _id: string;
}

const App = () => {
  const [form, setForm] = useState<Iform>({
    username: "",
    email: "@gmail.com",
    password: ""
  });
  const [users, setUsers] = useState<IformId[] | null>(null)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [deleteShow, setDeleteShow] = useState<boolean>(false)
  // const [editShow, setEditShow] = useState<boolean>(false)
  const [actionId, setActionId] = useState<string>('1')
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const getUsers = async () => {
    try {
      const res = await fetch(BASE_API)
      const data = await res.json()
      toast("user getted")
      setUsers(data)
    } catch (err) {
      console.log(err)
      toast("get user feild")
    }
  }

  useEffect(() => { getUsers() }, [])

  const handleChange = (e: Che) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { username, email, password } = form;
    if (username.length < 3) return toast("username not valid min length 3");
    if (email.length < 13) return toast("email not valid min length 13");
    if (password.length < 6) return toast("password not valid min length 6");
    setSubmitLoading(true)
    try {
      const res = await fetch(BASE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data: { message: string } = await res.json()
      console.log(data)
      if (Object.keys(data).length && data.message) {
        toast(data.message)
      }

    } catch (err) {
      console.log(err)
      toast("you have error")
    } finally {
      setSubmitLoading(false)
    }
  }

  const showDeleteModal = (userId: string) => {
    setActionId(userId)
    setDeleteShow(true)
  }

  const handleDeleteUser = async () => {
    setLoadingDelete(true)
    try {
      const res = await fetch(BASE_API + actionId, { method: "DELETE" })
      const data = await res.json()
      if (Object.keys(data).length && data.message) {
        toast(data.message)
      }
      getUsers()
    } catch (err) {
      toast("you have a error check console")
      console.log(err)
    } finally {
      setLoadingDelete(false)
    }
    setDeleteShow(false)
  }

  return (
    <div className="flex flex-col items-center pt-5 min-h-screen bg-black">
      <ToastContainer
        toastClassName="my-toast-font"  // کلاس CSS سفارشی برای همه توست‌ها
        position="bottom-left"
        draggable
      />

      <h1 className="text-3xl font-extrabold mb-6 text-white">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl space-y-4"
      >
        <div>
          <input
            type="text"
            name="username"
            placeholder="Enter your username *"
            onChange={handleChange}
            value={form.username}
            className="ipt"
          />
        </div>


        <div>
          <input
            type="text"
            name="email"
            placeholder="Enter your email *"
            value={form.email}
            onChange={handleChange}
            className="ipt"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password *"
            value={form.password}
            onChange={handleChange}
            className="ipt"
          />
        </div>

        <div className="flex justify-center gap-2.5 text-sm">
          <p>Already have an account?</p>
          <button onClick={() => window.location.reload()} className="text-sky-400 hover:underline">
            Login
          </button>
        </div>

        <button
          type="submit"
          className={`w-full bg-sky-500 duration-200 text-white py-2 rounded-lg font-semibold ${submitLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-blue-600 hover:scale-105"}`}
          // className={`w-full bg-sky-500 duration-200 text-white py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-600 hover:scale-105`}
          disabled={submitLoading}
        >
          {submitLoading ? "Loading ..." : "Register"}
        </button>
      </form>
      {/* {
        usersLoading ? (
          <div className="text-center scale-110">
            loading get users ...
          </div>
        ) : ( */}
      <div className="">
        {
          users?.map(({ email, username, _id }) => (
            <div key={_id} className="w-[32rem] mt-2 bg-white users flex items-center justify-between pl-3 p-2 rounded-lg">
              <p className="sss">{username}</p>
              <p className="sss">{email}</p>
              <div className="flex gap-2">
                <button className="btn bg-red-400" onClick={() => showDeleteModal(_id)}>Delete</button>
                {/* <button className="btn bg-blue-400" onClick={() => showEditModal(_id)}>Edit</button> */}
              </div>
            </div>
          ))
        }
      </div>
      {/* )
      } */}
      <Modal show={deleteShow} setShow={setDeleteShow} >
        <div className="fixed z-0 w-screen h-screen min-h-screen bg-black/75" onClick={() => { }}></div>
        <div className="flex justify-center items-center">
          <div className="bg-white w-4/6 rounded-lg fixed z-10 flex justify-center text-center py-3 pb-5">
            <div className="sure">
              <p className="mb-8 text-xl capitalize">are you sure delete user ?</p>
              <div className="flex justify-center gap-2">
                <button className="btn capitalize bg-blue-400 disabled:hover:bg-blue-400 disabled:opacity-70 disabled:hover:scale-100 " disabled={loadingDelete} onClick={() => setDeleteShow(false)}>no</button>
                <button className="btn capitalize bg-red-400 disabled:hover:bg-red-400 disabled:opacity-70 disabled:hover:scale-100 " disabled={loadingDelete} onClick={handleDeleteUser}>{loadingDelete ? "deleting ..." : "yes"}</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* <Modal show={editShow} setShow={setEditShow} >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white px-6 pt-2.5 rounded-xl space-y-4"
        >
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter your username *"
              onChange={handleChangeEditForm}
              value={editForm.username}
              className="ipt"
            />
          </div>


          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter your email *"
              value={editForm.email}
              onChange={handleChangeEditForm}
              className="ipt"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password *"
              value={editForm.password}
              onChange={handleChangeEditForm}
              className="ipt"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-orange-400 duration-200 text-white py-2 rounded-lg font-semibold ${loadingEdit ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-orange-500 hover:scale-105"}`}
            disabled={loadingEdit}
            onClick={handleEditUser}
          >
            {loadingEdit ? "Loading ..." : "Register"}
          </button>
          <button
            type="submit"
            className={`w-full bg-sky-500 duration-200 text-white py-2 rounded-lg font-semibold ${loadingEdit ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-blue-600 hover:scale-105"}`}
            onClick={() => setEditShow(false)}
            disabled={loadingEdit}
          >
            Cancel
          </button>

        </form>
      </Modal> */}

    </div>
  );
};

export default App;
