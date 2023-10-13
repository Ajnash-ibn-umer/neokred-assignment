import { Children, ReactElement } from "react";
import style from "./input.module.css";
import { BsSearch } from "react-icons/bs";
interface InputTextInterFace {
  onChange?: (e: any) => void;
  value?: string;
  type: "text" | "textArea" | "radio" | "checkbox" | "select" | "date" | string;
  children?: ReactElement;
  defaultValue?: string;
  placeholder?: string;
  checked?: boolean;
  label?: string;
  name?: string;
}

const Input = ({
  defaultValue,
  children,
  type,
  onChange,
  value,
  checked,
  placeholder,
  label,
  name,
  ...props
}: InputTextInterFace) => {
  // checkbox
  if (type === "checkbox") {
    return (
      <>
        <label className={style.container}>
          {label}
          <input
            type={type}
            {...props}
            onChange={onChange}
            value={value}
            name={name}
            placeholder={placeholder}
            className={style.checkInput}
          />
          <span className={style.checkmark} />
        </label>
      </>
    );
  } //select box
  else if (type === "select") {
    return (
      <>
        <div className={style.selectWrapper}>
          <select
            {...props}
            onChange={onChange}
            value={value}
            name={name}
            className={style.selectInput}
          >
            {children}
          </select>
        </div>
      </>
    );
  }
  //textArea
  else if (type === "textArea") {
    return (
      <>
        <textarea
          cols={30}
          rows={10}
          {...props}
          onChange={onChange}
          value={value}
          name={name}
          className={style.textArea}
        ></textarea>
      </>
    );
  } else if (type === "radio") {
    return (
      <>
        <input
          {...props}
          onChange={onChange}
          value={value}
          type={"radio"}
          name={name}
          placeholder={placeholder}
          className={style.radioInput}
        />
      </>
    );
  } else if (type === "search") {
    return (
      <>
        <div className={style.searchBox}>
          <input
            {...props}
            onChange={onChange}
            value={value}
            type={"text"}
            name={name}
            placeholder={placeholder}
            className={style.searchInput}
          />
          <div className={style.placeHolderIcon}>
            <BsSearch />
          </div>
        </div>
      </>
    );
  } else {
    // other input field
    return (
      <>
        <input
          {...props}
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          placeholder={placeholder}
          className={style.textInput}
        />
      </>
    );
  }
};

// export
export default Input;