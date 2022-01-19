const Error = () => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800">Sorry about that!</p>
            </div>
          </div>
          <div>
            <img src={require("../static/images/404-2.png")} alt="404" />
          </div>
        </div>
      </div>
      <div>
        <img src={require("../static/images/Group.png")} alt="Down" />
      </div>
    </div>
  );
};

export default Error;
