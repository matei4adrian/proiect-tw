const ReadMoreModal = (props) => {
  const { showModal, setShowModal, experience } = props;

  return (
    <>
      {showModal ? (
        <div>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative read-more my-6 mx-auto max-w-3xl">
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col read-more bg-white opacity-95 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="flex items-center">
                    <div className="py-1">
                      <svg
                        className="fill-blue-600 h-6 w-6 text-teal-500 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl text-blue-600 font-semibold">
                      Experience
                    </h3>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent color-black text-black opacity h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    <div className="text-center">
                      <p className="text-xl text-gray-700 font-bold mb-2">
                        {experience.author}
                      </p>
                      <div className="flex justify-center items-center">
                        <svg
                          className="h-4 w-4 text-gray-400 mr-1"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
                        </svg>
                        <p className="text-base text-gray-400 font-normal">
                          From: {experience.startPoint}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <svg
                          className="h-4 w-4 text-gray-400 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>

                        <p className="text-base text-gray-400 font-normal">
                          To: {experience.endPoint}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <svg
                          className="h-4 w-4 text-gray-400 mr-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <circle cx="12" cy="12" r="10" />{" "}
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <p className="text-base text-gray-400 font-normal">
                          Departure hour: {experience.departureHour}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <svg
                          className="h-4 w-4 text-gray-400 mr-1"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />{" "}
                          <path
                            d="M11 19.95a8 8 0 0 1 -5.3 -12.8"
                            strokeDasharray=".001 4.13"
                          />
                        </svg>
                        <p className="text-base text-gray-400 font-normal">
                          Duration: {experience.duration}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <svg
                          className="h-4 w-4 text-gray-400 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <p className="text-base text-gray-400 font-normal">
                          Agglomeration: {experience.agglomeration}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <svg
                          className="h-4 w-4 text-gray-400 mr-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                        </svg>
                        <p className="text-base text-gray-400 font-normal">
                          Satisfaction level: {experience.satisfactionLevel}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <svg
                          className="h-4 w-4 text-gray-400 mr-1"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <circle cx="6" cy="17" r="2" />{" "}
                          <circle cx="18" cy="17" r="2" />{" "}
                          <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />{" "}
                          <polyline points="16 5 17.5 12 22 12" />{" "}
                          <line x1="2" y1="10" x2="17" y2="10" />{" "}
                          <line x1="7" y1="5" x2="7" y2="10" />{" "}
                          <line x1="12" y1="5" x2="12" y2="10" />
                        </svg>
                        <p className="text-base text-gray-400 font-normal">
                          Vehicle type: {experience.vehicleType}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <svg
                          className="h-4 w-4 text-gray-400 mr-1"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3" />{" "}
                          <line x1="8" y1="9" x2="16" y2="9" />{" "}
                          <line x1="8" y1="13" x2="14" y2="13" />
                        </svg>
                        <p className="text-base text-gray-400 font-normal">
                          Observations:
                        </p>
                      </div>
                      <p className="text-base break-all text-gray-400 font-normal">
                        {experience.observations}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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

export default ReadMoreModal;
