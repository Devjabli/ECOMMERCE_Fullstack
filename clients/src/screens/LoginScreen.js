import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../feataures/users/authUserSlice";
import { useNavigate, useLocation } from "react-router-dom";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const prev = location.state?.prev || "/";

  const { userInfo, error } = useSelector((state) => state.authUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(authUser({ email, password }));
  };

  console.log(error);
  useEffect(() => {
    if (userInfo && userInfo.email) {
      navigate(prev, { replace: true });
    }
  }, [userInfo, navigate, prev, error]);

  return (
    <div class="flex flex-col items-center justify-center mx-auto px-6 py-8 md:h-screen">
      <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-400">
        <div class="p-6 space-y-6 sm:p-8">
          <h1 class="text-xl font-bold text-indigo-800 leading-tight tracking-tight md:text-2xl">
            Sign in to your account
          </h1>
          <form onSubmit={handleLogin} class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-200 placeholder-gray-400"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                class="bg-slate-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class=" border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    class="text-slate-500"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <p
              class="text-sm font-medium text-slate-500 hover:underline"
              >
                Forgot password?
              </p>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
           
            <div class="text-sm font-light text-gray-600">
              Don’t have an account yet?{" "}
              <p
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
