import React from "react";

const InputField = ({ placeholder, onChange, value }) => {
  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className={styles.inputField}
      />
    </div>
  );
};
export default InputField;