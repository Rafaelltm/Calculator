import React from 'react';

import './Button.css';

export default props =>
    <button 
        className={props.type}
        onClick={e => props.click && props.click(props.label)}
    >
        {props.label}
    </button>