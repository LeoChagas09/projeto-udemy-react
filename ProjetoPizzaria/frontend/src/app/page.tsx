'use client';

import { FormEvent, useContext, useState } from 'react';
import logoIMg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthContext } from '@/contexts/AuthContext';

import Link from 'next/link';
import { toast } from 'react-toastify';


export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.error("Preencha os campos!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    <div className={styles.containerCenter}>
      <Image src={logoIMg} alt="Logo Sujeito Pizzaria"/>

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input placeholder="Digite seu email" type="email" value={email} onChange={ (e) => setEmail(e.target.value) }/>

          <Input placeholder="Sua senha" type="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>


          <Button type="submit" loading={loading}>
            Acessar
          </Button>
        </form>

        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastra-se
        </Link>
      </div>

    </div>
  );
}
