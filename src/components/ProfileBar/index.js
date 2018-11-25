import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './profile-bar.css'

class ProfileBar extends Component {
    render() {
        return (
            <div className="root-profile-bar" >
                <Link to="/profile">
                    <figure>
                        <img className="avatar" src={this.props.picture} alt={this.props.username} />
                    </figure>
                </Link>
                <span className="username">Hola @{this.props.username}</span>
                <button onClick={this.props.onOpenText} className="button-profile-bar">
                    <span className="fa fa-lg fa-edit"></span> Tweet!
                </button>
            </div>
        );
    }
}

export default ProfileBar;