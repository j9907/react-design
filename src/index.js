import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './modules/rootReducer'
import { Provider } from 'react-redux';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import TodoList from './components/TodoList';

const store = configureStore({ reducer: rootReducer });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <Routes>
    <Route path="/" Component={App}/>
    <Route path="/todoList" Component={TodoList}></Route>
    </Routes>
    
  </Provider>
  </BrowserRouter>
);