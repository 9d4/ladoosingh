import { h } from 'preact';
import style from './style.css';

const Home = () => (
	<div class={style['home-container']}>
		<div class={style.home_card}>
			<h1 class={style.home_card__title}>Ladoosingh</h1>
			<h3 class={style.home_card__subtitle}>The Request Inspector</h3>
			<button class={style.home_card__button}>Generate Hook Link</button>
		</div>
	</div>
);

export default Home;
