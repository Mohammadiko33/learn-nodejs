import React, { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
  const [loading , setLoading] = useState<boolean>(false)

  const handleChange = (e: Che) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.username.length < 3) {
      toast.error("username input must be 3 chrackter", { position: "bottom-left" })
      return;
    }
    if (form.gmail.length < 13) {
      toast.error("gmail input must be 3 chrackter", { position: "bottom-left" })
      return;
    }
    if (form.password.length < 6) {
      toast.error("password input must be 3 chrackter", { position: "bottom-left" })
      return;
    }
    setLoading(false)
    try {
      const res = await fetch("http://localhost:3000/api/users/new-user" , {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form)
      })
      const parseRes = await res.json()
      console.log(parseRes)
      if (res.status === 201){
        toast.success("submited", { position: "bottom-left" })
      }
    } catch (err) {
      toast.error("you have error check console")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-2 border border-sky-400 rounded-lg";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <ToastContainer />
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
            className={inputClass}
          />
        </div>


        <div>
          <input
            type="text"
            name="gmail"
            placeholder="Enter your email *"
            value={form.gmail}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password *"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex justify-center gap-2.5 text-sm">
          <p>Already have an account?</p>
          <Link to="/login" className="text-sky-400 hover:underline">
            Login
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 duration-200 hover:scale-105 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 cursor-pointer"
        >
          {loading ? "Loading ..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default App;
