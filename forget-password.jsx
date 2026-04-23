import { useState, useEffect } from "react";
import Brand from "./Brand";
import EmailInput from "./Email.input";
import ResetButton from "./reset-button";
import "./App.css";
import styles from "./forgetpassword.module.css";

function ForgetPassword() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // تبديل الكلاس في الـ body عند تغيير الحالة
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="auth-page">
      <div className="bg-glow"></div>
      
      {/* زر تبديل المود */}
      <button 
        className={styles.themeToggle} 
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className={styles.authContainer}>
        <Brand />
        <h1 className={styles.authTitle}>
          FORGOT YOUR <span className={styles.gradientText}>PASSWORD ?</span>
        </h1>
        <EmailInput />
        <ResetButton />
        <p className={styles.backLink}>
          Back to <a href="#">login</a>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;