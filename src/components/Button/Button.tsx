import styles from "./Button.module.css"

export default function Button({isPrimary, children, onClick}) {

    return <button type="button" onClick={onClick} className={`${styles.button} ${isPrimary ? styles["is-primary"] : ""}`}>{children}</button>
}