import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import girlMusica from '../images/girlMusica.webp';
import logo from '../images/logo.jpeg';
import './Profile.css';

class Profile extends React.Component {
  state = {
    loading: true,
    profile: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      profile: user,
      loading: false,
    });
  }

  render() {
    const { loading, profile } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <>
            <div className='profile-container'>
              <div className='girl-music-box'>
              <img className='girl-music' src={girlMusica} alt="Menina ouvindo musica" />
              </div>
                <div className='profile-box'>
              {profile.image ? <img className='profile-image' src={profile.image} alt={profile.name} /> :
                <img className='profile-image desaturate' src={logo} alt="sem imagem de profile" /> }
            <h2 className='profile-title'>Profile</h2>
                <p className='profile-information'>Nome:</p>
                <p className='profile-infos'>{profile.name}</p>
                <span className='line'></span>
                <p className='profile-information'>E-mail:</p>
                <p className='profile-infos'>{profile.email}</p>
                <span className='line'></span>
                <p className='profile-information'>Descrição:</p>
                <p className='profile-infos'>{profile.description}</p>
            <div>
                  <Link to="/profile/edit">
                    <button
                  type="button"
                  className='button-profile'
              // disabled={!valid}
            >
              Editar Perfil
                </button>
              </Link>
            </div>
              </div>
              </div>
            </>
        )}
        <Footer />
      </>
    );
  }
}

export default Profile;
