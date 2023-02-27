import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import './Album.css';
import Footer from '../components/Footer';

class Album extends React.Component {
  state = {
    music: [],
    album: {},
    loading: false,
    best: [],
    // musicFav: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    this.songList(params.id);
    // this.favoriteMusic();
  }

  songList = async (id) => {
    const list = await getMusics(id);
    const ideiaFeia = await getFavoriteSongs();
    this.setState({
      album: list[0],
      music: list.slice(1),
      best: ideiaFeia,
    }, () => this.setState({ loading: false }));
  };

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
      await addSong(ongaku);
      this.setState((prevState) => ({ loading: false,
        best: [...prevState.best, ongaku] }));
    }
  };

  // favoriteMusic = async () => {
  //   const getFavorite = await getFavoriteSongs();
  //   const favoriteList = getFavorite.reduce((acc, curr) => ({
  //     ...acc,
  //     [curr.trackId]: true,
  //   }), []);
  //   this.setState((prevState) => ({
  //     musicFav: [...prevState.musicFav, ...favoriteList] }));
  // };

  render() {
    const { album, music, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div className='search-container'>
            <div>
            <h2 className='search-title'>{album.artistName} - {album.collectionName}</h2>
            {/* <img className="album-img" src={ album.artworkUrl100 } alt="" /> */}
            {/* <h3 className="album-name">{album.collectionName}</h3> */}
            </div>
            <div className='favorite-search-container'>
            {music.map((item) => (<MusicCard
              key={ item.trackName }
              { ...item }
              checked={ this.checkedOk(item) }
              favorita={ this.favorita }
            />))}
            </div>
            </div>
        )}
        <Footer />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
