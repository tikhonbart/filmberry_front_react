import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../components/ThemeContext';

const inter = Inter({ subsets: ['latin'] })

interface Movie {
  id: number;
  medium_cover_image: string;
  title: string;
  rating: number;
  genres: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const [selectedGenre, setSelectedGenre] = useState<string | null>('all'); // Изначально выбран жанр "All"

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${currentPage}&limit=${moviesPerPage}&genre=${selectedGenre}`);
        const data = await response.json();
        setMovies(data.data.movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, [currentPage,selectedGenre]);

  const handlePagination = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };


  // Функция для фильтрации фильмов по выбранному жанру
  const filterByGenre = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? 'All' : genre); // Если жанр уже выбран, сбросить фильтр
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <main className={theme === 'dark' ? 'dark-theme' : 'light-theme'} >
      <div className="warapper" >
        <h1>Spider man no way home</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto nisi, minima autem earum cupiditate eius consequatur deleniti minus praesentium, veniam reprehenderit repudiandae. Placeat perspiciatis iste nostrum harum inventore, voluptatem voluptates.</p>
        <p>2022|16+|1 Seasons| TV Series for teenagers</p>
        <p>4.3</p>
        <button>▶ WATCH</button>
      </div>
      <div className="main-content">
        <div className="category-wrapper">
          <div className="category">
            <button className={selectedGenre === 'all' ? 'selected' : ''} onClick={() => filterByGenre('all')}>ALL</button>
            <button className={selectedGenre === 'Comedy' ? 'selected' : ''} onClick={() => filterByGenre('Comedy')}>Comedy</button>
            <button className={selectedGenre === 'Drama' ? 'selected' : ''} onClick={() => filterByGenre('Drama')}>Drama</button>
            <button className={selectedGenre === 'Animation' ? 'selected' : ''} onClick={() => filterByGenre('Animation')}>Animation</button>
            <button className={selectedGenre === 'Fantasy' ? 'selected' : ''} onClick={() => filterByGenre('Fantasy')}>Fantasy</button>
            <button className={selectedGenre === 'Family' ? 'selected' : ''} onClick={() => filterByGenre('Family')}>Family</button>
            <button className={selectedGenre === 'Horror' ? 'selected' : ''} onClick={() => filterByGenre('Horror')}>Horror</button>
          </div>
        </div>
        
        <div className="movie-grid">
          {movies
          .map((movie) => (
            <Link href={`/${movie.id}`}>
              <div className="movie-tile" key={movie.id}>
                <img src={movie.medium_cover_image} alt={movie.title} />
                <div className="movie-info">
                  <h3>{movie.rating}⭐</h3>
                  <h2>{movie.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="pagination">
          {[...Array(10)].map((_, index) => (
            <button className={currentPage === index + 1 ? 'selected' : ''} onClick={() => handlePagination(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
