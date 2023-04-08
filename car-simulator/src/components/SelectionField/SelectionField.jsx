import React from "react";
import styles from "./SelectionField.module.css";
function SelectionField({
  options,
  onOptionChangeHandler,
  defaultPlaceholder,
  objectProperty,
  fieldName,
}) {
  return (
    <div>
      <select
        name={fieldName}
        className={styles.selection}
        onChange={onOptionChangeHandler}
        required
      >
        {defaultPlaceholder ? (
          <option value="" disabled selected hidden>
            {defaultPlaceholder}
          </option>
        ) : null}
        {options.length ? (
          options.map((option, index) => {
            return (
              <option
                key={index}
                value={option.value ? option.value : option[objectProperty]}
              >
                {option[objectProperty]}
              </option>
            );
          })
        ) : (
          <option disabled>Add a Scenario</option>
        )}
      </select>
    </div>
  );
}

export default SelectionField;
