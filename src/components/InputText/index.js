import React from 'react';
import PropTypes from 'prop-types';
import './inputText.css'

const InputText = ({onSendText,usernameToReply,onCloseText}) => {
    return (
        <div>
                <form className="form" onSubmit={onSendText}>
                    <textarea className="textarea" name="text" defaultValue={(usernameToReply) ? `@${usernameToReply} ` : ""} >
                        {}
                    </textarea>
                    <div className='buttons'>
                        <button className="button-close" onClick={onCloseText}>Cerrar</button>
                        <button className="button-send" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
    );
};

InputText.propTypes = {
    onSendText: PropTypes.func.isRequired,
    onCloseText: PropTypes.func.isRequired,
    usernameToReply: PropTypes.string.isRequired,
};

export default InputText;