import React from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      best: [],
      checked: true,
    };
  }

  async componentDidMount() {
    const list = await getFavoriteSongs();
    this.setState({ loading: false, best: list });
  }

  // favoriteList = async () => {
  //   this.setState({ loading: true });
  //   await removeSong();
  //   const list1 = await getFavoriteSongs();
  //   this.setState({ favList: list1, loading: false });
  // };

  // favoriteList = ({ target: { name } }) => {
  //   this.setState({ loading: true }, () => {
  //     const { favList } = this.state;
  //     const obj = favList.find((musica) => +musica.trackId === +name);
  //     this.removerFav(obj);
  //   });
  // };
  checkedOk = (ongaku) => {
    const { best } = this.state;
    return best.some((fav) => fav.trackId === ongaku?.trackId);
  };

  favorita = async (ongaku) => {
    const { best } = this.state;
    if (this.checkedOk(ongaku)) {
      this.setState({ loading: true });
      await removeSong(ongaku);
      const newBest = best.filter((e) => e.trackId !== ongaku?.trackId);
      this.setState({ loading: false, best: newBest });
    } else {
      this.setState({ loading: true });
      this.setState((prevState) => ({ loading: false,
        best: [...prevState.best, ongaku] }));
    }
  };

  render() {
    const { loading, best, checked } = this.state;

    return (
      <>
        {loading && <Loading />}
        {!loading && (
          <div className='favorite-container'>
          <div className='favorites-title'>Favorites</div>
          <div className='favorite-search-container'>
            {best.map((fav, ) => (
              <MusicCard
              { ...fav }
              checked={ checked }
              key={ fav.trackId }
              // checkedOk={ this.checkedOk(fav) }
              favorita={ this.favorita }
              />
            ))}
            </div>
            </div>
        )}
      </>
    );
  }
}

export default Favorites;
