import logoIMg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


export default function Home() {
  return (
    <div className={styles.containerCenter}>
      <Image src={logoIMg} alt="Logo Sujeito Pizzaria"/>

      <div className={styles.login}>
        <form>
          <Input placeholder="Digite seu email" type="text"/>

          <Input placeholder="Digite sua senha" type="password"/>


          <Button type="submit" loading={false}>
            Acessar
          </Button>
        </form>

        <a className={styles.text}>Não possui uma conta? Cadastra-se</a>
      </div>

    </div>
  );
}
