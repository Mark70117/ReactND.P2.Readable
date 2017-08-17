//https://egghead.io/lessons/javascript-redux-adding-react-router-to-the-project

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DefaultView from './DefaultView';
import CategoryDetails from './CategoryDetails';
import PostDetailView from './PostDetailView';
import PostCreateEditView from './PostCreateEditView';
import CommentCreateEditView from './CommentCreateEditView';

const Root = ({ store }) =>
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DefaultView} />
        <Route path="/category/:categoryStr" component={CategoryDetails} />{' '}
        <Route exact path="/postedit" component={PostCreateEditView} />
        <Route exact path="/postedit/:postId" component={PostCreateEditView} />
        <Route
          exact
          path="/commentedit/:category/:postId/:commentId"
          component={CommentCreateEditView}
        />
        <Route
          exact
          path="/commentedit/:category/:postId"
          component={CommentCreateEditView}
        />
        <Route path="/:category/:postId" component={PostDetailView} />
      </Switch>
    </BrowserRouter>
  </Provider>;

export default Root;
