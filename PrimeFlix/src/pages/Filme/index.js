/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

import './filme-info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme(){
      await api.get(`movie/${id}`, {
        params: {
          api_key: '2625459fe3ff2d72d799290ade00de61',
          language: 'pt-BR',
        }
      })
      .then((resp) => {
        setFilme(resp.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/", { replace: true });
        return;
      })
    }

    loadFilme();

    return () => {

    }

  }, [navigate, id]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem('@primeflix');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if(hasFilme){
      toast.warning('Esse filme já está na lista!');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!');

  }

  if(loading){
    return (
      <div className="filmes-info">
        <h2>Carregando detalhes...</h2>
      </div>
    )
  }

  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme} className="salvar-button">Salvar <FontAwesomeIcon icon={faSave} /></button>

        <button className="trailer-button">
          <a href={`https:/youtube.com/results?search_query=${filme.title} Trailer`} target="_blank" rel="external noreferrer">
            Trailer
          </a>
          <FontAwesomeIcon icon={faYoutube} />
        </button>
      </div>
      
    </div>
  );
}

export default Filme;