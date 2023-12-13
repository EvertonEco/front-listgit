import React from 'react';
import styles from './styles.module.css';

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.userInfo}>
        <h3>Everton</h3>
      </div>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarCircle}></div>
      </div>
    </div>
  );
};

export default TopBar;
