import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import './Search.css';
import { getUser } from '../services/userAPI';
import Favorites from './Favorites';
import logo from '../images/logo.jpeg';
import Footer from '../components/Footer';

class Search extends React.Component {
  state = {
    loading: false,
    search: '',
    artista: '',
    albumList: [],
    btnDisable: true,
    frase: false,
    profile: {},
    favorite: true,
  };

    async componentDidMount() {
    const user = await getUser();
    this.setState({
      profile: user,
    });
  }


  handleInput = (event) => {
    const { value } = event.target;
    const minCaracteres = 2;
    const btn = value.length < minCaracteres;
    this.setState({
      search: value,
      btnDisable: btn,
    });
  };

  searchAlbunsAndArtist = async () => {
    const { search } = this.state;
    this.setState({
      loading: true,
      search,
    });
    const albumArtista = await searchAlbumsAPI(search);
    this.setState({
      loading: false,
      artista: search,
      albumList: albumArtista,
      frase: true,
      favorite: false,
    });
  };

  render() {
    const { loading, albumList, artista, btnDisable, frase, profile, favorite } = this.state;
    return (
      <div data-testid="page-search" className='search-container'>
        <Header />
        {loading ? <Loading /> : (
          <div className='search-top-box'>
          <div className='search-box'>
            <ion-icon name="search-outline" className="search-icon"></ion-icon>
            <label htmlFor="search">
              <input
                id="search"
                className='input-search'
                name="search"
                type="text"
                data-testid="search-artist-input"
                onChange={this.handleInput}
              // value={search}
              />
            </label>
            <button
              type="button"
              className='button-search'
              data-testid="search-artist-button"
              disabled={ btnDisable }
              onClick={ this.searchAlbunsAndArtist }
            >
              Pesquisar
            </button>
            </div>
            <div className='search-profile-box'>
              <p className='search-profile-name'>{profile.name}</p>
              {profile.image ? <img className='search-avatar' src={profile.image} alt={profile.name} /> :
                <img className='search-avatar desaturate' src={logo} alt="sem imagem de profile" /> }
            </div>
            </div>
        )}
        {favorite && < Favorites />}
        {((albumList.length > 0)) ? (
          <>
            <h2 className='search-title'>{`Resultado de álbuns de: ${artista}`}</h2>
            <div className='search-grip-container'>
            {albumList.map((e) => (
              <Link
                key={ e.collectionId }
                to={`/album/${e.collectionId}`}
                className='album-container'
              >
                <p className='search-name'>{e.collectionName}</p>
                <img  className='search-image' src={ e.artworkUrl100 } alt="" />
              </Link>
            ))}
              </div>
          </>
        ) : (frase && <p>Nenhum álbum foi encontrado</p>)}
        <Footer />
      </div>
    );
  }
}

export default Search;
