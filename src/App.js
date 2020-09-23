import React, {useEffect, useState} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositores, setRepositores] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositores(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Game_JV',
      url: 'http://github.com/breno-rocha/game_jv',
      techs: ['Node.js', 'ReactJS']
    })

    setRepositores([...repositores, response.data]);
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositores(repositores.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositores.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
