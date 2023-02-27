import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";
// import Loading from './Loading';
import logo from "../images/logo.jpeg";
import "./Header.css";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: "",
    };
  }

  componentDidMount() {
    getUser().then((name) => {
      this.setState({
        loading: false,
        user: name.name,
      });
    });
  }

  render() {
    // const { user, loading } = this.state;
    return (
      <header className="header-component">
        <div className="header-container container">
          
            <Link className="logo-box-header" to="/search">
            <img className="logo-header" src={logo} alt="Ongaku Tunes Logo" />
              <h1 className="logo-name">Ongaku Tunes</h1>
              </Link>
          
          <div data-testid="header-user-name">
            {/* {loading ? <Loading /> : user} */}
          </div>
          <div className="link-container">
            <Link to="/search" data-testid="link-to-search">
              <div className="header-link">Search</div>
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <div className="header-link">Favorites</div>
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <div className="header-link">Profile</div>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
