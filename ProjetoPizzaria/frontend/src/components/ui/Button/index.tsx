import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
  children: ReactNode,
}


export function Button({loading, children, ...rest }: ButtonProps){
  return (
    <button className={styles.button} disabled={loading} {...rest}>
      { loading ? (
          <FaSpinner color='#fff' size={20}/>
        ) : (
          <a className={styles.buttonText}>{children}</a>
        )
      }
      
    </button>
  )
}