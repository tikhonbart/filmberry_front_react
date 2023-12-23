import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/filmPage.module.css';
import axios from 'axios';
import { useTheme } from '../components/ThemeContext';

const MoviePage = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [movieData, setMovieData] = useState(null);
  var pageKey = "";

  if (typeof window !== 'undefined' && window.localStorage) {
    pageKey = window.location.href;
  }

  const[comments, setComments] = useState<CommentProps[]> (() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localData = localStorage.getItem(pageKey);
      return localData ? JSON.parse(localData) : [];
    }
  });

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`);
        const data = await response.json();
        setMovieData(data.data.movie);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(pageKey, JSON.stringify(comments));
    }

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId,comments, pageKey]);

  type CommentProps = {
    id: number;
    //userName: string;
    commentText: string;
  };

  const CommentItem: React.FC<CommentProps & { comments: CommentProps[]; setComments: React.Dispatch<React.SetStateAction<CommentProps[]>> }> 
= ({ id, commentText, comments, setComments }) => {
    const [localComments, setLocalComments] = useState<CommentProps[]>(comments);

    const handleDelete = () => {
      const updatedComments = localComments.filter(comment => comment.id !== id);
      setLocalComments(updatedComments);
      setComments(updatedComments);
      
    }
    return (
      <div>
        <p>{commentText}</p>
        <button onClick={handleDelete}>delete</button>
      </div>
    );
  };

  interface Comment {
    id: number;
    text: string;
    // Other properties related to comments
  }

  function addComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newComment: CommentProps = {
      id: comments.length + 1,
      //userName: "User " + userName,
      commentText: "Wrote: " + commentText
    };
    setComments([...comments, newComment]);
    //setUserName('');
    setCommentText('');

    
  }

  function handleCommentTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentText(event.target.value);
  }

  // Создаем массив элементов React, каждый из которых представляет отдельный комментарий
  const commentItems = comments.map((comment) => (
    <CommentItem
      key = {comment.id}
      id = {comment.id}
      commentText = {comment.commentText}
      comments={comments}
      setComments={setComments}
    />
  ));

  if (!movieData) {
    return <div>Loading...</div>;
  }

  const {
    title,
    medium_cover_image,
    runtime,
    date_uploaded,
    genres,
    language,
    like_count,
    dislike_count,
    description_intro,
    rating,
    yt_trailer_code,
    similar_movies,
  } = movieData;

  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`${styles.moviePage} ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className={styles.movieDetails}>
        <div className={styles.coverInfo}>
          {medium_cover_image ? (
            <img src={medium_cover_image} alt={title} />
          ) : (
            <div className={styles.placeholder}>
              <p>No cover available</p>
            </div>
          )}
          <div className={styles.mainInfo}>
            <h1>{title}</h1>
            <p>Runtime: {runtime} min</p>
            <p>Release Date: {date_uploaded}</p>
            <p>Genres: {genres.join(', ')}</p>
            <p>Rating: {rating}</p>
            <p>Language: {language}</p>
            <button>
                <a
                    href={`https://www.youtube.com/watch?v=${yt_trailer_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ▶ Watch
                </a>
            </button>
          </div>
        </div>
        <div className={styles.aboutMovie}>
            <h2>About Movie</h2>
            {description_intro ? <p>{description_intro}</p> : <p>No description available</p>}
        </div>
        <div className={styles.comments}>
          <h2>Comments</h2>
          <form onSubmit={addComment}>
            <p>Your Comment:</p>
            <textarea value={commentText} onChange={(e) => handleCommentTextChange(e)}/>
            <button type="submit">Add comment</button>
          </form>

          {/* Список комментариев */}
          {commentItems}
          
        </div>
        <div className={styles.similarMovies}>
          <h2></h2>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;