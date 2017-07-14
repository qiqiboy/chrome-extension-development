import React from 'react';
import './style.scss';

export default function(props) {
    return <div className="info-item">
        <label className="label">{props.label}</label>
        <div className="content">{props.content}</div>
    </div>
}
