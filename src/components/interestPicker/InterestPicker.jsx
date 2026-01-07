import "./InterestPicker.css";

export default function InterestPicker({ items = [], selected = [], onToggle }) {
  return (
    <div className="interest-picker">
      {items.map(({ name, img }) => { // get name and img from every item in items
        const isSelected = selected.includes(name); //boolean. if selected array includes an interest (form items)
        return (
          <button
            type="button"
            key={name}
            className={`edit-interest-card ${isSelected ? "selected" : ""}`}
            onClick={() => onToggle(name)}
            onKeyDown={(e) => e.key === "Enter" && onToggle(name)}
            aria-pressed={isSelected}
          >
            <img src={img} alt={name} />
            <div className="edit-interest-name">{name}</div>
          </button>
        );
      })}
    </div>
  );
}
