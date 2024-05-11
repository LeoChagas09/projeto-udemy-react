import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSadCry, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem('@primeflix');
    setFilmes(JSON.parse(minhaLista) || []);

  }, [])

  function excluirFilme(id){
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id);
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    toast.success('Filme removido com sucesso!');
  }

  return (
    <div className='meus-filmes'>
      <h1>Meus filmes</h1>

      {filmes.length === 0 && <span className="filme-zerado">Você não possui nenhum filme salvo <FontAwesomeIcon icon={faSadCry} />
      </span>}

      <ul>
        {filmes.map((filme) => {
          return (
            <li key={filme.id}>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} className="filme-imagem" />
              
              <span>{filme.title}</span>
              <div>
                <>
                  <Link to={`/filme/${filme.id}`} className="detalhes-link">Detalhes <FontAwesomeIcon icon={faCircleInfo} /></Link>                
                  <button onClick={() => excluirFilme(filme.id)} className="excluir-button">Excluir <FontAwesomeIcon icon={faTrash} /></button>
                </>
              </div>

            </li>
          )
        })}
      </ul>
      
    </div>
  )
}

export default Favoritos;