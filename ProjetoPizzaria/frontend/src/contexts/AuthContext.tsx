'use client';

import { api } from '@/services/apiClient';
import { useRouter } from 'next/navigation';
import  Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try {
    destroyCookie(undefined, '@nextauth.token');

    Router.push('/');
  } catch (error) {
    console.log('erro ao deslogar');
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps | any>();
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {

    //pegar algo no cookie
    const { '@nextauth.token': token } = parseCookies();

    if(token){
      api.get('/me').then((response) => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })
      })
      .catch(() => {
        // se deu erro deslogamos o user
        signOut();
      })
    }
  })

  async function signIn({ email, password }: SignInProps){

    try {
      const response = await api.post('/session', {
        email,
        password
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
      });

      setUser({
        id,
        name,
        email
      });

      //PASSAR PARA PROXIMAS REQUISIÇÕES O TOKEN
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Logado com sucesso!');

      // REDIRECIONAR O USER PARA O /DASHBOARD
      router.push('/dashboard');

    } catch (error) {
      toast.error('Erro ao acessar!');
    }
  }

  async function signUp({ name, email, password } : SignUpProps){
    try {
      const response = await api.post('users', {
        name,
        email,
        password
      });

      toast.success('Conta criada com sucesso!');

      router.push('/');

    } catch (error) {
      toast.error('Erro ao cadastrar!');
    }
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}