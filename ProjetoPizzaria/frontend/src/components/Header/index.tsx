'use client';

import { useContext } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

export function Header(){

  const { user, signOut } = useContext(AuthContext);

  return(
    <header className={styles.headerContainer}>
      <div  className={styles.headerContent}>
        <>
          <Link href="/dashboard">
            <img src="/logo.svg" width={190} height={60} />
          </Link>

          <nav className={styles.menuNav}>
            <Link href="/category">
              <span>Categoria</span>
            </Link>

            <Link href="/product">
              <span>Cardápio</span>
            </Link> 

            <button onClick={signOut}>
              <span>{user?.name}</span> <FiLogOut color="#fff" size={24}/>  
            </button> 

          </nav>
        </>
      </div>
    </header>
  )
}