const AddExperienceButton = (props) => {
  const { isMyExperiencePage } = props;

  return (
    <div
      className={
        isMyExperiencePage ? "flex justify-end invisible" : "flex justify-end"
      }
    >
      <a
        role="button"
        className="bg-purple-600 flex justify-center items-center text-center hover:bg-purple-700 text-white text-sm px-4 py-2 border rounded-full"
        href="./add-experience"
      >
        <svg
          className="h-4 w-4 text-white mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add an experience
      </a>
    </div>
  );
};

export default AddExperienceButton;
