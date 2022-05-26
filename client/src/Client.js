import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useAuthSystem from './hooks/useAuthSystem';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import MyFollows from './pages/MyFollows';
import UserPosts from './pages/UserPosts';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import About from './pages/About';
import AppContainer from './components/AppContainer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Guest from './middlewares/Guest';
import Protected from './middlewares/Protected';
import NotFoundError from './components/errors/NotFoundError';

export default function Client() {
  useAuthSystem();
  return (
    <Router>
      <div>
        <Navbar />
        <AppContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <Route exact path="/posts/user/:username" component={UserPosts} />
            <Route exact path="/about" component={About} />

            <Guest exact path="/login" component={Login} />
            <Guest exact path="/register" component={Register} />
            <Protected exact path="/account" component={Account} />
            <Protected exact path="/me/posts" component={MyPosts} />
            <Protected exact path="/me/follows" component={MyFollows} />

            <Route path="*" component={NotFoundError} />
          </Switch>
        </AppContainer>
        <Footer />
      </div>
    </Router>
  );
}
