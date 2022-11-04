import React, { useEffect, useState } from 'react'
import './styles.css'
import './variables.css'
import {
    Button,
    CodeInput,
    Memory,
    Registers,
    Tab
} from '../Components'
import Controller from '../sisprog-modules/controller'

const controller = new Controller();

const HomeScreen = () => {

    const [memory, setMemory] = useState([]);
    const [RD, setRD] = useState(0);
    const [PC, setPC] = useState(0);

    const updateStateWithMemState = (memoryState) => {
        setMemory(memoryState.memory);
        setRD(memoryState.RD);
        setPC(memoryState.PC);
    }

    const handleGetMemoryState = () => {
        const memoryState = controller.getMemoryState();
        setMemory(memoryState.memory);
        setRD(memoryState.RD);
        setPC(memoryState.PC);
    }

    useEffect(() => {
        handleGetMemoryState();
    }, [])
    return (
        <div className='screen'>
            <div>

                <Tab 
                    active
                    label={'Editor'}
                    onClick={() => {
                        console.log('Tab click')
                    }}
                />
                <CodeInput />
                <div id="button-row">
                    <Button
                        onClick={() => {
                            const rawInputCode = document.getElementById('code-input-field').value;
                            const memoryState = controller.setupExecution(rawInputCode);
                            setMemory(memoryState.memory);
                            setRD(memoryState.RD);
                            setPC(memoryState.PC);
                        }}
                        label={'Carregar código'}
                    />
                    <Button
                        onClick={() => {
                            const memoryState = controller.run();
                            updateStateWithMemState(memoryState)
                        }}
                        label={'Executar completo'}
                    />
                    <Button
                        onClick={() => {
                            const memoryState = controller.runInstruction();
                            updateStateWithMemState(memoryState)
                        }}
                        label={'Executar passo'}
                    />
                </div>
            </div>
            <div>

                <Memory 
                    memory={memory}
                />
                <Registers 
                    RD={RD}
                    PC={PC}
                />
            </div>
        </div>
    )
}

export default HomeScreen