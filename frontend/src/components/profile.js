import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditSuccess from "./experiences/edit-succes";
import AlertModal from "./modals/alert-modal";
import Error from "./error";

const validateUser = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Please enter username";
  } else if (values.username.length < 5) {
    errors.username = "Username length should be over 5 characters";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(values.username)
  ) {
    errors.username = "Invalid username";
  }

  if (!values.password) {
    errors.password = "Please enter password";
  } else if (!values.password.match(/[a-z]/g)) {
    errors.password = "Password should contains at least one lower characters";
  } else if (!values.password.match(/[A-Z]/g)) {
    errors.password = "Password should contains at least one upper characters";
  } else if (!values.password.match(/[0-9]/g)) {
    errors.password = "Password should contains at least one digit";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Password should be between 8 and 20 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.city) {
    errors.city = "Please enter city";
  } else if (!values.city.match(/[A-Za-z]/g)) {
    errors.city = "City should not contains characters other than A-Z and a-z";
  }

  return errors;
};

const Profile = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      username: JSON.parse(user).username,
      password: "",
      confirmPassword: "",
      city: JSON.parse(user).city,
    },
    validate: validateUser,
    onSubmit: (values) => {
      const userBody = {
        username: values.username,
        password: values.password,
        city: values.city,
      };
      fetch(`http://localhost:8080/api/users/${JSON.parse(user).id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(userBody),
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
          localStorage.setItem("user", JSON.stringify(data));
          setSuccess(true);
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
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div>
      {success ? (
        <EditSuccess fromProfile={true} />
      ) : (
        <div className="p-7 bg-gray-100">
          <div className="text-center text-2xl font-semibold text-black">
            Hello,
          </div>
          <div className="text-center text-2xl font-semibold text-black">
            {JSON.parse(user).firstName}
          </div>
          <div className="text-center mt-9 text-xl font-semibold text-black">
            Your account info:
          </div>
          <form className="mt-8 mb-8" onSubmit={formik.handleSubmit}>
            <div className="mx-auto max-w-lg mb-5 ">
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">
                  Username (email)
                </span>
                <input
                  id="username"
                  placeholder="Username"
                  type="text"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
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
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">Password</span>
                <input
                  id="password"
                  placeholder="**********"
                  type="password"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
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
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">
                  Confirm password
                </span>
                <input
                  id="confirmPassword"
                  placeholder="**********"
                  type="password"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  autoComplete="on"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <span className="error">{formik.errors.confirmPassword}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">City</span>
                <input
                  id="city"
                  placeholder="City"
                  type="text"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  autoComplete="on"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
                {formik.touched.city && formik.errors.city ? (
                  <span className="error">{formik.errors.city}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>

              <div className="flex justify-center items-center space-x-7">
                <button
                  className="form-button px-4 py-2 font-bold text-white bg-green-600 rounded-full hover:bg-green-800 focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleClick}
                >
                  Update account
                </button>
              </div>
            </div>
          </form>
          <AlertModal
            showModal={showModal}
            setShowModal={setShowModal}
            errorMessage={errorMessage}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
