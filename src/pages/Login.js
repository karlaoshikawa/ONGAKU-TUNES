import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import boyMusic from '../images/meninoMusica.webp';
import logo from '../images/logo.jpeg'
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ' ',
      email: '',
      loading: false,
    };
  }

  handleLogin = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ loading: true });
    createUser({ name }).then(() => history.push('/search'));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { loading, name, email } = this.state;
        const magicNumber = 2;
    const validName = name.length >= magicNumber;
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const valid = validEmail && validName;
    return (
      <div className='container-login-page login'>
        {loading ? <Loading /> : (
          <span className='login-container'>
            <img className='boy-img' src={boyMusic} alt="menino ouvindo musica" />
            <div className='login-box'>
              <div className='logo-box'>
              <img className='logo' src={logo} alt="Ongaku Tunes Logo" />
              <h1 className='text-logo'>Ongaku Tunes</h1>
              </div>
              <div className='form-box'>
              <h2>Login</h2>
            <label htmlFor="name">
              Insira seu nome
          <input
            className='input-login'
            id="name"
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            // placeholder="Insira seu nome"
            onChange={ this.handleChange }
          />
          </label>
            <label htmlFor="email">
              insira seu e-mail
          <input
                    id="email"
                    className='input-login'
            type="email"
            name="email"
            value={ email }
            // placeholder="Insira seu e-mail"
            onChange={ this.handleChange }
          />
          </label>
            <button
              type="button"
                  data-testid="login-submit-button"
                  className='button-login'
              disabled={!valid}
              onClick={ this.handleLogin }
            >
              Entrar
                </button>
                </div>
          </div>  
          </span>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
