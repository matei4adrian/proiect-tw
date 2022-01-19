import { useFormik } from "formik";
import Dropdown from "../dropdown";

const validateFilter = (values) => {
  const errors = {};

  if (
    (!values.startPoint || values.startPoint === "none") &&
    (!values.endPoint || values.endPoint === "none") &&
    (!values.vehicleType || values.vehicleType === "none")
  ) {
    errors.startPoint = "Please select one option";
  }

  return errors;
};

const FilterModal = (props) => {
  const { setExperiences, showModal, setShowModal, experiences } = props;
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      startPoint: "",
      vehicleType: "",
      endPoint: "",
    },
    validate: validateFilter,
    onSubmit: (values) => {
      fetch(
        `http://localhost:8080/api/experiences?vehicleType=${values.vehicleType}&startPoint=${values.startPoint}&endPoint=${values.endPoint}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      )
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
          formik.resetForm();
          setExperiences(data);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    validateOnBlur: false,
  });

  const handleClick = () => {
    for (var value in formik.initialValues) {
      formik.setFieldTouched(value, true);
    }
  };

  return (
    <>
      {showModal ? (
        <div>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative read-more my-6 mx-auto max-w-3xl">
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col read-more bg-white opacity-95 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="flex items-center">
                    <h3 className="text-3xl text-blue-600 font-semibold">
                      Filter experiences
                    </h3>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      formik.resetForm();
                      setShowModal(false);
                    }}
                  >
                    <span className="bg-transparent color-black text-black opacity h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    <form className="mt-8 mb-8" onSubmit={formik.handleSubmit}>
                      <div className="mx-auto max-w-lg mb-5 ">
                        <div className="text-center grid ">
                          <span className="px-1 text-sm text-gray-600">
                            By location
                          </span>
                          <Dropdown
                            id={"startPoint"}
                            experiences={experiences}
                            value={formik.values.startPoint}
                            handleChange={formik.handleChange}
                          />
                          <span className="px-1 text-sm text-gray-600">
                            By vehicle type
                          </span>
                          <Dropdown
                            id={"vehicleType"}
                            experiences={experiences}
                            value={formik.values.vehicleType}
                            handleChange={formik.handleChange}
                          />
                          <span className="px-1 text-sm text-gray-600">
                            By destination
                          </span>
                          <Dropdown
                            id={"endPoint"}
                            experiences={experiences}
                            value={formik.values.endPoint}
                            handleChange={formik.handleChange}
                          />

                          {formik.errors.startPoint ? (
                            <span className="error">
                              {formik.errors.startPoint}
                            </span>
                          ) : (
                            <div>&nbsp;</div>
                          )}

                          <button
                            className="w-2/4 justify-self-center mt-9 px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleClick}
                          >
                            Apply filter
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      formik.resetForm();
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
};

export default FilterModal;
