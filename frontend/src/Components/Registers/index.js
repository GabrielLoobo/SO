import React from 'react';
import { parseIntToHex } from '../../utils/numeric.js';
import './styles.css';

const Registers = (props) => {
    const { RD, PC } = props;

    return (
        <div className='reg-wrapper'>
            <div className='reg-header'>
                <p className='reg-title'>Registradores</p>
            </div>
            <div className='reg-body'>
                <div className='reg-row'>
                    <p className='reg-title' style={{paddingBottom:15}}>Label</p>
                    <p className='reg-title' style={{paddingBottom:15}}>Dados</p>
                </div>
                <div className='reg-row'>
                    <p style={{paddingBottom:15}}>RD</p>
                    <p style={{paddingBottom:15}}>{parseIntToHex(RD, 2)}</p>
                </div>
                <div className='reg-row'>
                    <p style={{paddingBottom:15}}>PC</p>
                    <p style={{paddingBottom:15}}>{parseIntToHex(PC, 2)}</p>
                </div>
                
            </div>
        </div>
    )
}

export default Registers;