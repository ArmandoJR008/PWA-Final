import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ComicDetail() {
  const { id } = useParams();
  const [comicDetail, setComicDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComicDetail = async () => {
      setIsLoading(true);
      setError(null);
      const apiKey = process.env.REACT_APP_COMIC_VINE_API_KEY;
      const url = `https://cors-anywhere.herokuapp.com/http://comicvine.gamespot.com/api/issue/4000-${id}/?api_key=604b9ea76b05b5b339ad8189752f35aa6fad4f7f&format=json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComicDetail(data.results);
      } catch (error) {
        console.error('Failed to fetch comic details:', error);
        setError('Failed to fetch comic details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComicDetail();
  }, [id]);

  if (isLoading) {
    return <p>Loading comic details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!comicDetail) {
    return <p>Comic details not available.</p>;
  }

  return (
    <div className='comic-detail'>
      <h2>{comicDetail.name}</h2>
      <img src={comicDetail.image?.original_url} alt={`${comicDetail.name} cover`} />
      {/* Display more details as needed */}
    </div>
  );
}

export default ComicDetail;
