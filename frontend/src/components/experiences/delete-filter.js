const DeleteFilter = (props) => {
  const { isMyExperiencePage, getExperiences } = props;

  const handleClick = () => {
    getExperiences();
  };

  return (
    <div
      className={
        isMyExperiencePage ? "flex justify-end invisible" : "flex justify-end"
      }
      onClick={handleClick}
    >
      <button className="bg-red-600 flex justify-center items-center text-center hover:bg-red-700 text-white text-sm px-4 py-2 border rounded-full">
        Reset filter
      </button>
    </div>
  );
};

export default DeleteFilter;
