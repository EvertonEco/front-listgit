import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import TopBar from '../TopBar'

const Error = () => {
  return (
    <>
        <TopBar />
        <div className={styles.errorContainer}>
          <h2 className={styles.errorHeading}>Erro de autenticação</h2>
          <h3 className={styles.errorSubheading}>Volte para o Login</h3>
          <Link href={'/'}>
            <button className={styles.errorButton}>Voltar</button>
          </Link>
        </div>
    </>
  );
};

export default Error;
