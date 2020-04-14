import React, { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Projeto em React.js',
      url: 'https://github.com/andersonmenezesm/conceitos-nodejs',
      techs: ['Node.js', 'Reactjs']
    })

    setRepositories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <h1>Repositórios</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <div className="repository">
            <li key={repository.id}>
              <div>
                {repository.title}
              </div>
              <div>
                {repository.techs}
              </div>
              <div>
                {repository.likes}
              </div>
            <div>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </div>
            </li>
          </div>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
