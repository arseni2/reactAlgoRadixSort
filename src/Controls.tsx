import React from 'react';

type propsType = {
    setStepRunning: (auto: boolean) => void
    cleanStepRunningStates: () => void
    changeCurrentStepCallback: (step: number) => void
    currentStep: number
}

const Controls = (props: propsType) => {
    return (
        <>
            <div style={{display: 'flex', gap: '10px',justifyContent: 'center', padding:'5px 0'}}>
                <h1>Пошаговое выполнение</h1>
                <input type="checkbox" onChange={(e) => {
                    props.setStepRunning(e.target.checked)
                    props.cleanStepRunningStates()
                }}/>
            </div>

            <div style={{display: 'flex', gap: '10px', justifyContent: 'center', padding:'5px 0'}}>
                <h1>Переход к шагу</h1>
                <input className="number" type="number" value={props.currentStep} onChange={(e) => {
                    props.changeCurrentStepCallback(Number(e.target.value))
                }} />
            </div>
        </>
    );
};

export default Controls;