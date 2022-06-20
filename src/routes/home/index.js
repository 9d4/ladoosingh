import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import style from './style.css';
import Loading from '../../components/loading';
import { generateHook } from '../../api/api-client';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateBtnOnClick = async () => {
    setLoading(true);
    setError('');
    
    generateHook()
      .then((link) => {
        route(`/inspect/${link}`, true);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div class={style['home-container']}>
      <div class={style.home_card}>
        <h1 class={style.home_card__title}>Ladoosingh</h1>
        <h3 class={style.home_card__subtitle}>The Request Inspector</h3>
        <div
          class={style.home_card__error + ' ' + (error ? style.show : '')}
        >
          {error}
        </div>
        <div class={style.home_card__btn_container}>
          {loading ? (
            <Loading />
          ) : (
            <button
              class={style.home_card__button}
              onClick={generateBtnOnClick}
            >
              Generate Hook Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
