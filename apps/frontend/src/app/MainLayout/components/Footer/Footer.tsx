import styles from '../../styles/footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-wrap']}>
        <div className={styles['footer-left']}>
          <div className={styles['footer-name-wrap']}>
            <h2 className={styles['footer-name-medical']}>Medical</h2>
            <h2 className={styles['footer-name-online']}>ONLINE</h2>
          </div>

          <div className={styles['footer-copy-wrap']}>
            <p className={styles['footer-copy-icon']}>&#169;</p>
            <p className={styles['footer-copy-year']}>2023</p>
            <p className={styles['footer-copy-name']}>
              ЭЛЕКТРОННАЯ РЕГИСТРАТУРА
            </p>
          </div>
        </div>

        {/* <div className={styles['footer-contact']}>
          <button className={styles['subscribe-btn']}>ПОДПИСАТЬСЯ</button>
          <button className={styles['mail-btn']}>e-mail</button>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
