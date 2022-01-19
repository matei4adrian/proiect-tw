const FilterButton = (props) => {
  const { isMyExperiencePage, setShowModal } = props;

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div
      className={
        isMyExperiencePage ? "flex justify-end invisible" : "flex justify-end"
      }
      onClick={handleClick}
    >
      <button className="bg-blue-600 flex justify-center items-center text-center hover:bg-blue-700 text-white text-sm px-4 py-2 border rounded-full">
        Filter
      </button>
    </div>
  );
};

export default FilterButton;
