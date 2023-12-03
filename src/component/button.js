import React from 'react';
import '../style/button.css';

function button(props) {
    return (
        <div>
            <button type="submit" className="btn btn-primary">{props.text}</button>
        </div>
    );
}

export default button;
