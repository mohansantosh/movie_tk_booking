import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

/*
var WebFont = require('webfontloader');

WebFont.load({
google: {
    families: ['Droid Sans', 'Droid Serif']
}
});
*/
ReactDOM.render(
    <BrowserRouter>
        <App /> 
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
