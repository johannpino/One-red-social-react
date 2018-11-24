import React, { Component } from 'react';
import './profile-bar.css'

class ProfileBar extends Component {
    render() {
        return (
            <div className="root-profile-bar" >
                <figure>
                    <img className="avatar" src={this.props.picture} alt={this.props.username} />
                </figure>
                <span className="username">Hola @{this.props.username}</span>
                <button onClick={this.props.onOpenText} className="button-profile-bar">
                    <span className="fa fa-lg fa-edit"></span> Tweet!
                </button>
            </div>
        );
    }
}

export default ProfileBar;