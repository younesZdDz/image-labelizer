import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AnnotationsProvider } from './contexts/annotations.context';
import { AuthProvider } from './contexts/auth.context';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthProvider>
                <AnnotationsProvider>
                    <App />
                </AnnotationsProvider>
            </AuthProvider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root'),
);
