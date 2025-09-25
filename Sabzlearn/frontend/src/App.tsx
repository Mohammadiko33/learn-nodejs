import React, { useState, type ChangeEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "./Components/Modal";
export type Che = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Iform {
  username: string,
  gmail: string,
  password: string;
}

const App = () => {


  const [form, setForm] = useState<Iform>({
    username: "",
    gmail: "",
    password: ""
  });
  const [editForm , setEditForm] = useState<Iform>({
    username: "yadowithme",
    gmail: "",
    password: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

  const handleChange = (e: Che) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleChangeEditForm = (e: Che) => {
    const { name, value } = e.target;
    setEditForm({
      ...form,
      [name]: value,
    });
  };
  const [deleteShow, setDeleteShow] = useState<boolean>(false)
  const [editShow, setEditShow] = useState<boolean>(false)
  const [actionId, setActionId] = useState<string>("1")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.username.length < 3) {
      toast.error("username input must be 3 chrackter")
      return;
    }
    if (form.gmail.length < 13) {
      toast.error("gmail input must be 13 chrackter")
      return;
    }
    if (form.password.length < 6) {
      toast.error("password input must be 6 chrackter")
      return;
    }
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/")
      console.log(res)
      const parseRes = await res.json()
      console.log(parseRes)
      toast.success(parseRes.message)
      setLoading(false)
      if (!parseRes.message) {
        console.log(parseRes)
        console.log(res.status)
        if (res.status === 201) {
          toast.success("submited")
        }
      } else {
        toast.warn(parseRes.message)
      }
    } catch (err) {
      toast.error("you have error check console")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const showDeleteModal = (userId: string) => {
    setActionId(userId)
    setDeleteShow(true)
  }
  const showEditModal = (userId: string) => {
    setActionId(userId)
    setEditShow(true)
  }

  const handleDeleteUser = () => {
    toast(`deleted user with id : ${actionId}`)
    setDeleteShow(false)
  }

  const handleEditUser = () => {
    setLoadingEdit(true)
    setTimeout(() => {
     toast(`edit user with id : ${actionId}`)
      setEditShow(false)
      setLoadingEdit(false)
    }, 500);
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
            name="gmail"
            placeholder="Enter your email *"
            value={form.gmail}
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
          className={`w-full bg-sky-500 duration-200 text-white py-2 rounded-lg font-semibold ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-blue-600 hover:scale-105"}`}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Register"}
        </button>

      </form>
      <div className="w-[28.1rem] mt-2">
        <div className="bg-white users flex items-center justify-between pl-3 p-2 w-full rounded-lg">
          <p className="sss">User</p>
          <p className="sss">user.gmail.com</p>
          <div className="flex gap-2">
            <button className="btn bg-red-400" onClick={() => showDeleteModal("1")}>Delete</button>
            <button className="btn bg-blue-400" onClick={() => showEditModal("1")}>Edit</button>
          </div>
        </div>
      </div>
      lorem
      <Modal show={deleteShow} setShow={setDeleteShow} >
        <div className="fixed z-0 w-screen h-screen min-h-screen bg-black/75" onClick={() => { }}></div>
        <div className="flex justify-center items-center">
          <div className="bg-white w-4/6 rounded-lg fixed z-10 flex justify-center text-center py-3 pb-5">
            <div className="sure">
              <p className="mb-8 text-xl capitalize">are you sure delete user ?</p>
              <div className="flex justify-center gap-2">
                <button className="btn capitalize bg-blue-400" onClick={() => setDeleteShow(false)}>no</button>
                <button className="btn capitalize bg-red-400" onClick={handleDeleteUser}>yes</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={editShow} setShow={setEditShow} >
        <form
          // onSubmit={handleSubmit}
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
              name="gmail"
              placeholder="Enter your email *"
              value={editForm.gmail}
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
      </Modal>

    </div>
  );
};

export default App;
