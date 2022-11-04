import React, { useState } from 'react'
import './styles.css'

const Tab = (props) => {
    
    return (
        <div
            className={`tab-wrapper ${props.active ? 'active' : ''}`}
            onClick={props.onClick}
        >
            <p>{props.label}</p>
        </div>
    )
}

export default Tab;