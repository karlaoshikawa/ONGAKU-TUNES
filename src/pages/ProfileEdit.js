import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import meninoColorido from '../images/meninoColorido.webp';
import './ProfileEdit.css';
import Footer from '../components/Footer';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({ name, email, image, description, loading: false });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  newData = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, image, description });
    this.setState({ loading: false });
    history.push('/profile');
  };

  formValid() {
    const { name, email, image, description } = this.state;
    const isValid = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const empty = name.length > 0
    && email.length > 0
    && image.length > 0
    && description.length > 0;
    return !(isValid && empty);
  }

  render() {
    const { loading, name, email, description, image } = this.state;
    return (
      <>
        <Header />
        { loading ? <Loading /> : (
          <>
            <div className='profile-edit-container'>
            <div className='profile-box profile-edit'>
            <div className='profile-title'>Profile Edit</div>
              <p className='profile-information'>Nome:</p>
              <input
                type="text"
                data-testid="edit-input-name"
                  name="name"
                  className='input-profile-edit'
                value={ name }
                onChange={ this.handleChange }
              />
              <p className='profile-information'>e-mail:</p>
              <input
                type="text"
                name="email"
                  data-testid="edit-input-email"
                  className='input-profile-edit'
                value={ email }
                onChange={ this.handleChange }
              />
              <p className='profile-information'>Descricao:</p>
              <input
                type="text"
                name="description"
                  data-testid="edit-input-description"
                  className='input-profile-edit'
                value={ description }
                onChange={ this.handleChange }
              />
              <p className='profile-information'>Imagem:</p>
              <input
                type="text"
                name="image"
                  data-testid="edit-input-image"
                  className='input-profile-edit'
                value={ image }
                onChange={ this.handleChange }
                />
                <div>
              <button
                disabled={ this.formValid() }
                  type="button"
                  className='button-profile'
                data-testid="edit-button-save"
                onClick={ this.newData }
              >
                Save
                  </button>
                  </div>
              </div>
              <img className='edit-img' src={meninoColorido} alt="imagem colorido de menino ouvindo musica" />
            </div>
            <Footer />
          </>

        )}
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
