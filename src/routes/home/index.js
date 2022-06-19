import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style.css';
import Loading from '../../components/loading';

const Home = () => {
  const [loading, setLoading] = useState(false);

  const generateBtnOnClick = async () => {
    setLoading(true);
  };

  return (
    <div class={style['home-container']}>
      <div class={style.home_card}>
        <h1 class={style.home_card__title}>Ladoosingh</h1>
        <h3 class={style.home_card__subtitle}>The Request Inspector</h3>
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
