'use client';

import { Header } from '@/components/Header';
import styles from './style.module.scss';
import { FiUpload } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { setupAPIClient } from '@/services/api';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product(){
  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ description, setDescription ] = useState('');

  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [ imgAvatar, setImgAvatar ] = useState<File | null>(null);
  const [categories, setCategories] = useState<ItemProps[]>([]);
  const [categorySelected, setCategorySelected] = useState(0);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/category'); // Ajuste a URL conforme necessário
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias: ", error);
      }
    }

    fetchCategories();
  }, []);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if(!e.target.files){
      return;
    }

    const image = e.target.files[0];

    if(!image){
      return;
    }

    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setImgAvatar(image);

      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleChangeCategory(e: any){
    setCategorySelected(e.target.value);
  }

  async function handleRegister(e: FormEvent){
    e.preventDefault();

    try {
      const data = new FormData();

      if(name === '' || price === '' || description === '' || imgAvatar === null){
        toast.error("Preencha todos os campos!");
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imgAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success('Produto cadastrado com sucesso!');
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar produto!");
    }

    setName('');
    setPrice('');
    setDescription('');
    setImgAvatar(null);
    setAvatarUrl('');
  }

  return (
    <div>
      <Header/>

      <main className={styles.container}>
        <h1>Novo Produto</h1>

        <form className={styles.form} onSubmit={handleRegister}>

          <label className={styles.labelAvatar}>
            <span>
              <FiUpload size={30} color='#fff'></FiUpload>
            </span>

            <input type="file" accept='image/png, image/jpeg' onChange={handleFile}/>

            { avatarUrl && (
              <img className={styles.preview} src={avatarUrl} alt="Foto do produto"  width={250} height={250}/>
            )}
          </label>


          <select value={categorySelected} onChange={handleChangeCategory}>
          {categories.map((category, index) => (
              <option key={category.id} value={index}>{category.name}</option>
            ))}
          </select>

          <input value={name} onChange={(e) => setName(e.target.value)} 
          type="text"  placeholder="Digite o nome do produto" className={styles.input}/>

          <input value={price} onChange={(e) => setPrice(e.target.value)} 
           type="text" placeholder='Preço do produto' className={styles.input}/>

          <textarea value={description} onChange={(e) => setDescription(e.target.value)}  
          placeholder="Descreva seu produto..." className={styles.input}/>

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>
        </form>

      </main>
    </div>
  )
}