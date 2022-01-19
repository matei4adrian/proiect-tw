const Dropdown = (props) => {
  const { id, experiences, value, handleChange } = props;
  const itemsInDropdown = [];

  return (
    <select
      className="w-1/2 mt-5 mb-5 justify-self-center px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:border-sky-600"
      id={id}
      value={value}
      onChange={handleChange}
    >
      <option value="none">None</option>;
      {experiences.map((experience) => {
        if (!itemsInDropdown.includes(experience[id])) {
          itemsInDropdown.push(experience[id]);
          return <option value={experience[id]}>{experience[id]}</option>;
        }
      })}
    </select>
  );
};

export default Dropdown;
