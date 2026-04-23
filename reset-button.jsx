import styles from "./forgetpassword.module.css"

function ResetButton() {
  return (
    <button className={styles.btnReset}>
      Request Password Reset <span>→</span>
    </button>
  )
}
export default ResetButton