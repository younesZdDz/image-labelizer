import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AnnotationsProvider } from './contexts/annotations.context';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <AnnotationsProvider>
                <App />
            </AnnotationsProvider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root'),
);
