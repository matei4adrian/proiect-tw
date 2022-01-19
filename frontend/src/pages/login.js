import { useFormik } from "formik";
import { useEffect, useState } from "react";
import AlertModal from "../components/modals/alert-modal";
import { useNavigate } from "react-router-dom";

const validateUser = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Please enter an username";
  } else if (values.username.length < 5) {
    errors.username = "Username length should be over 5 characters";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(values.username)
  ) {
    errors.username = "Invalid username";
  }

  if (!values.password) {
    errors.password = "Please enter a password";
  } else if (!values.password.match(/[a-z]/g)) {
    errors.password = "Password should contains at least one lower characters";
  } else if (!values.password.match(/[A-Z]/g)) {
    errors.password = "Password should contains at least one upper characters";
  } else if (!values.password.match(/[0-9]/g)) {
    errors.password = "Password should contains at least one digit";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Password should be between 8 and 20 characters";
  }

  return errors;
};

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validateUser,
    onSubmit: (values) => {
      fetch("http://localhost:8080/api/users/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((json) => {
              throw new Error(json.message);
            });
          } else {
            return response.json();
          }
        })
        .then((data) => {
          localStorage.setItem("token", "Bearer " + data.token);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMessage(error.message);
          setShowModal(true);
        });
    },
    validateOnBlur: false,
  });

  const handleClick = () => {
    for (var value in formik.initialValues) {
      formik.setFieldTouched(value, true);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="h-full flex items-center font-mono bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full 2xl:w-8/12 xl:w-3/4 lg:w-5/7 flex">
            <div
              className="w-full h-auto bg-gray-200 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage: `url(${require("../static/images/login.png")})`,
              }}
            ></div>
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none ">
              <h3 className="pt-4 text-2xl text-center font-bold">
                Welcome Back!
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="username"
                  >
                    Username (email)
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                    id="username"
                    type="text"
                    placeholder="Username"
                    autoComplete="on"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <span className="error">{formik.errors.username}</span>
                  ) : (
                    <div>&nbsp;</div>
                  )}
                </div>
                <div>
                  <label
                    className="block mb-2 mt-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                    id="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <span className="error">{formik.errors.password}</span>
                  ) : (
                    <div>&nbsp;</div>
                  )}
                </div>
                <div className="mb-6 mt-4 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={handleClick}
                  >
                    Sign In
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-800"
                    href="/register"
                  >
                    Create an account!
                  </a>
                </div>
              </form>
            </div>
          </div>
          <AlertModal
            showModal={showModal}
            setShowModal={setShowModal}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
