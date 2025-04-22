import { forwardRef } from "react";

import styles from "./Input.module.css"

type InputProps = {
    label: string;
  } & React.InputHTMLAttributes<HTMLInputElement>;
  
  const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ id, label, type = "text", placeholder, ...rest}, ref) => {
      return (
        <div className={styles["input-container"]}>
          <label htmlFor={id} className={styles["input-label"]}>{label}</label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            ref={ref}
            className={styles.input}
            {...rest}
          />
        </div>
      );
    }
  );
  
  export default Input;