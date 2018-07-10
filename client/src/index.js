import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var WebFont = require('webfontloader');

WebFont.load({
google: {
    families: ['Droid Sans', 'Droid Serif']
}
});

ReactDOM.render(
    <App />, document.getElementById('root'));
registerServiceWorker();
