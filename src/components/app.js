import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Inspect from '../routes/inspect';

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
			<Inspect path='/inspect/:linkID' />
		</Router>
	</div>
)

export default App;
