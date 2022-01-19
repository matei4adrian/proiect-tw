import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSuccess from "./add-success";
import AlertModal from "../modals/alert-modal";

const validateExperience = (values) => {
  const errors = {};

  if (!values.startPoint) {
    errors.startPoint = "Please enter a departure";
  } else if (values.startPoint.length < 2) {
    errors.startPoint = "Invalid departure name";
  } else if (!values.startPoint.match(/[A-Za-z]/g)) {
    errors.startPoint =
      "Departure name should not contains characters other than A-Z and a-z";
  }

  if (!values.endPoint) {
    errors.endPoint = "Please enter a destination";
  } else if (values.endPoint.length < 2) {
    errors.endPoint = "Invalid destination name";
  } else if (!values.endPoint.match(/[A-Za-z]/g)) {
    errors.endPoint =
      "Destination name should not contains characters other than A-Z and a-z";
  }

  if (!values.vehicleType) {
    errors.endPoint = "Please choose a vehicle type";
  }

  if (!values.departureHour) {
    errors.departureHour = "Please choose a hour";
  }

  if (!values.duration) {
    errors.duration = "Please enter duration";
  } else if (values.duration <= 0) {
    errors.duration = "Invalid duration";
  }

  if (!values.agglomeration) {
    errors.agglomeration = "Please choose an option";
  }

  if (!values.observations) {
    errors.observations = "Please enter observations";
  } else if (values.observations.length > 300) {
    errors.observations =
      "Observations must not be longer than 300 characters ";
  }

  if (!values.satisfactionLevel) {
    errors.satisfactionLevel = "Please choose an emoji";
  }

  return errors;
};

const AddExperience = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      startPoint: "",
      endPoint: "",
      vehicleType: "Bus",
      departureHour: "",
      duration: 0,
      agglomeration: "High",
      observations: "",
      satisfactionLevel: "",
    },
    validate: validateExperience,
    onSubmit: (values) => {
      const userJson = JSON.parse(user);
      const bodyValues = {
        author: userJson.firstName + " " + userJson.lastName,
        startPoint: values.startPoint,
        endPoint: values.endPoint,
        vehicleType: values.vehicleType,
        departureHour: values.departureHour,
        duration: values.duration,
        agglomeration: values.agglomeration,
        observations: values.observations,
        satisfactionLevel: parseInt(values.satisfactionLevel),
      };
      fetch(`http://localhost:8080/api/users/${userJson.id}/experiences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(bodyValues),
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
          console.log(data);
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
        <AddSuccess />
      ) : (
        <div className="p-7 bg-gray-100">
          <div className="text-center text-2xl font-semibold text-black">
            Add experience
          </div>
          <form className="mt-8 mb-8" onSubmit={formik.handleSubmit}>
            <div className="mx-auto max-w-lg mb-5 ">
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">Departure</span>
                <input
                  id="startPoint"
                  placeholder="Departure"
                  type="text"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  autoComplete="on"
                  value={formik.values.startPoint}
                  onChange={formik.handleChange}
                />
                {formik.touched.startPoint && formik.errors.startPoint ? (
                  <span className="error">{formik.errors.startPoint}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">Destination</span>
                <input
                  id="endPoint"
                  placeholder="Destination"
                  type="text"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  autoComplete="on"
                  value={formik.values.endPoint}
                  onChange={formik.handleChange}
                />
                {formik.touched.endPoint && formik.errors.endPoint ? (
                  <span className="error">{formik.errors.endPoint}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">
                  The means of transport used
                </span>
                <select
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  id="vehicleType"
                  value={formik.values.vehicleType}
                  onChange={formik.handleChange}
                >
                  <option value="Bus">Bus</option>
                  <option value="Subway">Subway</option>
                  <option value="Train">Train</option>
                  <option value="Tram">Tram</option>
                  <option value="Cab">Cab</option>
                </select>
                {formik.touched.vehicleType && formik.errors.vehicleType ? (
                  <span className="error">{formik.errors.vehicleType}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">
                  Departure time
                </span>
                <input
                  type="time"
                  id="departureHour"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  value={formik.values.departureHour}
                  onChange={formik.handleChange}
                />
                {formik.touched.departureHour && formik.errors.departureHour ? (
                  <span className="error">{formik.errors.departureHour}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">
                  Departure duration (minutes)
                </span>
                <input
                  placeholder="Duration"
                  id="duration"
                  type="number"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                />
                {formik.touched.duration && formik.errors.duration ? (
                  <span className="error">{formik.errors.duration}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">
                  Agglomeration
                </span>
                <select
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  id="agglomeration"
                  value={formik.values.agglomeration}
                  onChange={formik.handleChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {formik.touched.agglomeration && formik.errors.agglomeration ? (
                  <span className="error">{formik.errors.agglomeration}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">
                  Observations (max 300 characters)
                </span>
                <textarea
                  placeholder="Observations"
                  id="observations"
                  type="text"
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
                  value={formik.values.observations}
                  onChange={formik.handleChange}
                />
                {formik.touched.observations && formik.errors.observations ? (
                  <span className="error">{formik.errors.observations}</span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>
              <div className="py-1 mb-3">
                <span className="px-1 text-sm text-gray-600">Satisfaction</span>
                <fieldset
                  id="satisfactionLevel"
                  className="items-center space-x-4 flex justify-center"
                  value={formik.values.satisfactionLevel}
                  onChange={formik.handleChange}
                >
                  <input
                    type="radio"
                    id="sad"
                    value="1"
                    name="satisfactionLevel"
                  />
                  <label htmlFor="sad">
                    <svg
                      className="h-8 w-8 text-yellow-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="9" />{" "}
                      <line x1="9" y1="10" x2="9.01" y2="10" />{" "}
                      <line x1="15" y1="10" x2="15.01" y2="10" />{" "}
                      <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
                    </svg>
                  </label>
                  <input
                    type="radio"
                    id="smiley"
                    value="2"
                    name="satisfactionLevel"
                  />
                  <label htmlFor="smiley">
                    <svg
                      className="h-8 w-8 text-yellow-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="9" />{" "}
                      <line x1="9" y1="10" x2="9.01" y2="10" />{" "}
                      <line x1="15" y1="10" x2="15.01" y2="10" />{" "}
                      <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                    </svg>
                  </label>
                  <input
                    type="radio"
                    id="love"
                    value="3"
                    name="satisfactionLevel"
                  />
                  <label htmlFor="love">
                    <svg
                      className="h-8 w-8 text-yellow-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="9" />{" "}
                      <line x1="9" y1="9" x2="9.01" y2="9" />{" "}
                      <line x1="15" y1="9" x2="15.01" y2="9" />{" "}
                      <path d="M8 13a4 4 0 1 0 8 0m0 0H8" />
                    </svg>
                  </label>
                </fieldset>
                {formik.touched.satisfactionLevel &&
                formik.errors.satisfactionLevel ? (
                  <span className="error">
                    {formik.errors.satisfactionLevel}
                  </span>
                ) : (
                  <div>&nbsp;</div>
                )}
              </div>

              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleClick}
              >
                Add
              </button>
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

export default AddExperience;
