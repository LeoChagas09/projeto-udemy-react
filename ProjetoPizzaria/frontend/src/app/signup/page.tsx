'use client';

import { Input } from '@/components/ui/Input';
import logoIMg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';
import Image from "next/image";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if(name === '' ||   email === '' || password === '') {
      toast.error("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);


  }


  return (
    <div className={styles.containerCenter}>
      <Image src={logoIMg} alt="Logo Sujeito Pizzaria"/>

      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form onSubmit={handleSignUp} >
          <Input placeholder="Digite seu nome" type="text" value={name} onChange={ (e) => setName(e.target.value) }  />
          
          <Input placeholder="Digite seu email" type="email" value={email} onChange={ (e) => setEmail(e.target.value) }/>

          <Input placeholder="Sua senha" type="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>

          <Button type="submit" loading={loading}>
            Cadastrar
          </Button>
        </form>

        <Link href="/" className={styles.text}>
          Já possui uma conta? Faça login!
        </Link>
      </div>

    </div>
  );
}
