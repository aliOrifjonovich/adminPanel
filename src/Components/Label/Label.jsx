import styles from "./Label.module.scss";

export default function Label({ label, children, id, ...props }) {
  return (
    <div className={styles.labelBox} {...props}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}
