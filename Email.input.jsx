import styles from "./forgetpassword.module.css"

function EmailInput() {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>Signed in email address</label>
      <div className={styles.inputWrapper}>
        <span className={styles.mailIcon}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M16 0H2C0.9 0 0 0.9 0 2V12C0 13.1 0.9 14 2 14H16C17.1 14 18 13.1 18 12V2C18 0.9 17.1 0 16 0ZM16 12H2V4L9 8.5L16 4V12ZM9 7L2 2.5V2L9 6.5L16 2V2.5L9 7Z" fill="white" fillOpacity="0.4"/>
          </svg>
        </span>
        <input type="email" placeholder="you@example.com" className={styles.emailInput} />
      </div>
    </div>
  )
}
export default EmailInput