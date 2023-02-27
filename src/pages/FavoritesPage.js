import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Favorites from './Favorites';

class FavoritesPage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Favorites />
        <Footer />
      </>
    )
}
};

export default FavoritesPage;
