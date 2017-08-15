//https://egghead.io/lessons/javascript-redux-adding-react-router-to-the-project

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import CategoryView from './CategoryView';
import PostDetailView from './PostDetailView';
import PostCreateEditView from './PostCreateEditView';
import CommentCreateEditView from './CommentCreateEditView';

const Root = ({ store }) =>
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/category" component={CategoryView} />
        <Route path="/postdetails/:postId" component={PostDetailView} />
        <Route exact path="/postedit" component={PostCreateEditView} />
        <Route path="/postedit/:postId" component={PostCreateEditView} />
        <Route
          exact
          path="/commentedit/:postId/:commentId"
          component={CommentCreateEditView}
        />
        <Route
          exact
          path="/commentedit/:postId"
          component={CommentCreateEditView}
        />
      </Switch>
    </BrowserRouter>
  </Provider>;

export default Root;
