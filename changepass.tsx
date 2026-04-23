import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import styles from './changepass.module.css';

function getStrength(pw: string): 0 | 1 | 2 | 3 {
  if (pw.length === 0) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return score as 0 | 1 | 2 | 3;
}

const strengthLabels = ['', 'Weak', 'Medium', 'Strong'];
const strengthClass = ['', styles.weak, styles.medium, styles.strong];

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function ChangePassword() {
  const { theme, toggleTheme } = useTheme();
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState(false);

  const strength = getStrength(newPw);
  const hasMin = newPw.length >= 8;
  const hasUpper = /[A-Z]/.test(newPw);
  const hasNumber = /[0-9]/.test(newPw);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPw);
  const pwMatch = newPw === confirmPw && confirmPw.length > 0;
  const canSubmit = strength >= 2 && pwMatch;

  const requirements = [
    { label: 'At least 8 characters', met: hasMin },
    { label: 'Uppercase letter', met: hasUpper },
    { label: 'Number', met: hasNumber },
    { label: 'Special character', met: hasSpecial },
  ];

  return (
    <div className={styles.page} data-theme={theme}>
      <div className={styles.bgGlow}></div>

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}></div>
          <span className={styles.brandName}>internary</span>
        </div>

        <div className={styles.badge}>🔒 Reset Password</div>

        <h1 className={styles.title}>
          CHANGE YOUR <span className={styles.gradientText}>PASSWORD</span>
        </h1>
        <p className={styles.description}>
          Choose a strong password to keep your account secure.
        </p>

        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <div>
            <label className={styles.fieldLabel}>New Password</label>
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                type={showNew ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowNew(p => !p)}
                aria-label="Toggle password visibility"
              >
                <EyeIcon open={showNew} />
              </button>
            </div>

            {newPw.length > 0 && (
              <>
                <div className={styles.strengthBar}>
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={`${styles.strengthSegment} ${i <= strength ? strengthClass[strength] : ''}`}
                    />
                  ))}
                </div>
                <div className={`${styles.strengthLabel} ${strengthClass[strength]}`}>
                  {strengthLabels[strength]}
                </div>
              </>
            )}
          </div>

          {newPw.length > 0 && (
            <div className={styles.requirements}>
              {requirements.map(r => (
                <div key={r.label} className={`${styles.reqItem} ${r.met ? styles.met : ''}`}>
                  <div className={styles.reqDot}></div>
                  {r.label}
                </div>
              ))}
            </div>
          )}

          <div>
            <label className={styles.fieldLabel}>Confirm Password</label>
            <div className={styles.inputWrap}>
              <input
                className={`${styles.input} ${touched && !pwMatch && confirmPw ? styles.hasError : ''}`}
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPw}
                onChange={e => { setConfirmPw(e.target.value); setTouched(true); }}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm(p => !p)}
                aria-label="Toggle password visibility"
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {touched && confirmPw.length > 0 && !pwMatch && (
              <p className={styles.errorMsg}>Passwords do not match</p>
            )}
          </div>

          <button className={styles.submitBtn} disabled={!canSubmit}>
            SAVE NEW PASSWORD <span>→</span>
          </button>
        </form>

        <p className={styles.backLink}>
          Back to <a href="#">login</a>
        </p>
      </div>
    </div>
  );
}

export default ChangePassword;