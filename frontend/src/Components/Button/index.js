import React from 'react'
import './styles.css'

const Button = (props) => {
    return (
        <button
            type="button"
            className={`button-wrapper`}
            onClick={props.onClick}
        >
            <p>{props.label}</p>
        </button>
    )
}

export default Button;