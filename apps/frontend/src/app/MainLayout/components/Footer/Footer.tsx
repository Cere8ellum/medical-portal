import styles from '../../styles/footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-wrap']}>
        <div className={styles['footer-left']}>
          <div className={styles['footer-name-wrap']}>
            <a href="/" className={styles['footer-name-medical']}>
              Medical
            </a>
            <a href="/" className={styles['footer-name-online']}>
              ONLINE
            </a>
          </div>

          <div className={styles['footer-copy-wrap']}>
            <p className={styles['footer-copy-icon']}>&#169;</p>
            <p className={styles['footer-copy-year']}>2023</p>
            <p className={styles['footer-copy-name']}>
              ЭЛЕКТРОННАЯ РЕГИСТРАТУРА
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
