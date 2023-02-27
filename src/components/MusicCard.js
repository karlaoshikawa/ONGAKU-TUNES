import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MusicCard.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, artworkUrl100, favorita, checked } =
      this.props;
    console.log(previewUrl);
    return (
      <div className="music-card-container">
        <img className="album-img" src={artworkUrl100} alt={trackName} />
        <div className="player-name-box">
          <p className="music-name">{trackName}</p>
          <div className="input-player">
            <audio className="audio-player" src={previewUrl} controls>
              <track kind="captions" />O seu navegador não suporta o elemento{" "}
              {/* <code>audio</code> */}
            </audio>

            {/* <label htmlFor="favorita" className="favorite-contain">
              <input
                id="favorita"
                className="favorite-input"
                name="favorita"
                type="checkbox"
                onChange={() => favorita(this.props)}
                checked={checked}
              />
              <span className="checkmark"></span>
            </label> */}
            <div
              className="checked"
            onClick={() => favorita(this.props)}
            >
              {checked ? <IoCheckboxOutline className="checked-icon" /> : <IoSquareOutline className="checked-icon"/> }
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favorita: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
