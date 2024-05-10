import { useEffect, useState } from "react";

function App(){

  const [input, setInputs] = useState('');
  const [tarefas, setTarefas] = useState([
    'Ir para o Google segunda',
    'Estudar React'
  ]);

  useEffect(() => {
    const tarefasStorage = localStorage.getItem('@tarefas');

    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@tarefa', JSON.stringify(tarefas));
  }, [tarefas]);

  

  function handleRegister(e){
    e.preventDefault();

    setTarefas([...tarefas, input]);
    setInputs('');

  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label>Nome da tarefa:</label>
        <input placeholder="Digite uma tarefa" type="text" value={input}  onChange={(e) => setInputs(e.target.value)}/>

        <br/>
        <br/>

        <button type="submit">Registrar</button>
      </form>

      <br />

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      
    </div>
  )
}

export default App;
