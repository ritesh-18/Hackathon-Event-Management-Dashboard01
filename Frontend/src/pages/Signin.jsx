// write ui code for signin pager here
import React , {useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    const [form , setForms]=useState({
      email:"",
      password:""
    })

  const handleChange=(e)=>{
    setForms({
      ...form , 
      [e.target.name]:e.target.value

    })
  }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(form)
        alert("Form Submitted")
        //navigate to dashboard page
        navigate("/home");
    }
  return (
    <>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      {/* Outer Container with Border */}
      <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
              onChange={handleChange}
                id="email"
                name="email"
                value={form.email}
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              {/* <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a> */}
            </div>
            <div className="mt-2">
              <input
               onChange={handleChange}
               value={form.password}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Footer Text */}
        {/* <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Start a 14-day free trial
          </a>
        </p> */}
      </div>
    </div>
  </div>
</>

  )
}

export default Signin

