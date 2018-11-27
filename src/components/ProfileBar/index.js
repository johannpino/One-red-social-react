import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './profile-bar.css'

const ProfileBar = ({picture,username,onOpenText}) => {
    return (
        <div className="root-profile-bar" >
                <Link to="/profile">
                    <figure>
                        <img className="avatar" src={picture} alt={username} />
                    </figure>
                </Link>
                <span className="username">Hola @{username}</span>
                <button onClick={onOpenText} className="button-profile-bar">
                    <span className="fa fa-lg fa-edit"></span> Tweet!
                </button>
        </div>
    );
};

ProfileBar.propTypes = {
    picture: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onOpenText: PropTypes.func.isRequired,
};

export default ProfileBar;