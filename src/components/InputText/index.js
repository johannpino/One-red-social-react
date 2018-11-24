import React, { Component } from 'react';
import './inputText.css'

class InputText extends Component {
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.props.onSendText}>
                    <textarea className="textarea" name="text"></textarea>
                    <div className='buttons'>
                        <button className="button-close" onClick={this.props.onCloseText}>Cerrar</button>
                        <button className="button-send" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default InputText;