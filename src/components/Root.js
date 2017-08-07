//https://egghead.io/lessons/javascript-redux-adding-react-router-to-the-project

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import CategoryView from './CategoryView';
import PostDetailView from './PostDetailView';
import PostCreateEditView from './PostCreateEditView';

const Root = ({ store }) =>
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/category" component={CategoryView} />
        <Route path="/postdetails" component={PostDetailView} />
        <Route path="/postedit" component={PostCreateEditView} />
      </div>
    </BrowserRouter>
  </Provider>;

export default Root;
