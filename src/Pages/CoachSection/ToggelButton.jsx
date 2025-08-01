import "./CoachSection.css";

const ToggleButton = ({ options, selectedItems, setSelectedItems }) => {
  const toggleSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="d-flex flex-wrap gap-3 ms-2" style={{ width: "19rem" }}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => toggleSelection(option)}
          className={`px-3 py-1 rounded-pill border-0 ${
            selectedItems.includes(option)
              ? "custom-filters-btn border-0"
              : "custom-before-btn"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;
