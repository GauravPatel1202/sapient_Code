import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { CardGrid, Card, Header } from './styles';

function getClickablePages(actualPage) {
  const offsets = [0, 1, 2, 3, 4];
  return offsets.map(number => parseInt(actualPage, 10) + number);
}

function getPage(direction, actualPage) {
  const nextPage = parseInt(actualPage, 10) + direction;

  return nextPage >= 0 ? nextPage : 1;
}

export default function Home({ match }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const clickablePages = getClickablePages(match.params.page || 1);
  const page = match.params.page || 1;

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const apiResponse = await api.get(`/?page=${page}`);

      setCharacters(apiResponse.data.results);
      setLoading(false);
    }

    loadData();
  }, [match.params.page]);

  return (
    <>
      
      <CardGrid>
        {loading ? (
          <p>Loading...</p>
        ) : (
          characters.map(char => (
            <Card
              key={char.id}
              // onClick={() => setDisplayEpisodes(char.id)}
              displayEpisodes={char.displayEpisodes}
            >
              <img src={char.image} alt={char.name} />
              <section>
                <header>
                  <h1>
                     {char.name}
                  </h1>
                  <h1>
                   id - {char.id}
                  </h1>
                  <h3>
                    {char.species} - {char.status}
                  </h3>
                </header>
              </section>
            </Card>
          ))
        )}
      </CardGrid>
      <Header>
        <header>
          <h1>
          </h1>
        </header>
        <ul>
          <Link to={`/${getPage(-1, page)}`}>
            <li> prev </li>
          </Link>
          {clickablePages.map(pageNumber => (
            <Link to={`/${pageNumber}`} key={pageNumber}>
              <li>{pageNumber}</li>
            </Link>
          ))}
          <Link to={`/${getPage(1, page)}`}>
            <li> next </li>
          </Link>
        </ul>
      </Header>
    </>
  );
}
