import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ComicsList() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestComics = async () => {
      setIsLoading(true);
      setError(null);      
      const url = `https://cors-anywhere.herokuapp.com/http://comicvine.gamespot.com/api/issues/?api_key=604b9ea76b05b5b339ad8189752f35aa6fad4f7f&format=json`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComics(data.results);
      } catch (error) {
        console.error('Failed to fetch comics:', error);
        setError('Failed to fetch comics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestComics();
  }, []);

  if (isLoading) {
    return <p>Loading comics...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='comic-list'>
      {comics.length > 0 ? (
        comics.map((comic) => (
          <div key={comic.id} className='comic-item'>
            <Link to={`/comic/${comic.id}`}>
              <img src={comic.image?.original_url} alt={`${comic.name} cover`} style={{ width: '100px', height: '150px' }} />
              <h3>{comic.name} #{comic.issue_number}</h3>
              <p>{comic.date_added}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>No comics found.</p>
      )}
    </div>
  );
}

export default ComicsList;
