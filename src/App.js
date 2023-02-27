import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import FavoritesPage from './pages/FavoritesPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div style={{height: '100vh', width: '100vw', position: 'relative'}}>
        <Switch>
          <Route exact path="/" component={ Login } /> 
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ FavoritesPage } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
          </div>
    );
  }
}

export default App;
