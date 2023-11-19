import {useState} from 'react'
import {ButtonPrimary, ErrorMsg, GrayBlock, Title} from "./StylingComponents";
//@ts-ignore
import locale from 'react-json-editor-ajrm/locale/en';
import {DigitSort} from "./utils";
import JSONInput from "react-json-editor-ajrm";
import Output from "./Output";
import Controls from "./Controls";

let defaultData = [
    {
        data: 1,
        next: {
            data: 2,
            next: {
                data: 3,
                next: null
            }
        }
    },

    {
        data: 3,
        next: null
    },

    {
        data: 2,
        next: {
            data: 3,
            next: null
        }
    }]

export type ListType = { data: number, next: any }

function App() {
    const [errors, setError] = useState<{ line: number, reason: string, token: number } | null>(null)
    const [value, setValue] = useState(DigitSort(defaultData))
    console.log(value)
    const [stepRunning, setStepRunning] = useState<boolean>(false)
    const [steps, setSteps] = useState<Array<string> | []>([])
    const [stepData, setStepData] = useState<[] | Array<ListType>>([])
    let [currentStep, setCurrentStep] = useState(0)

    const changeCurrentStepCallback = (step: number) => {
        if(step < 0 || step > value.length) {
            return;
        } else {
            console.log(step)
            setCurrentStep(step)
            clearPreviousStepsData(step)
        }
    }

    const onClickHandler = () => {
        cleanStepRunningStates()
        if (steps) {
            setSteps([])
        }
        if (!errors) {

            setValue(DigitSort(value, setSteps))
        }
    }
    const onChangeHandler = (e: any) => {
        if (e.error) {
            setError(e.error)
            return;
        }
        setError(null)
        //@ts-ignore
        setValue(e.jsObject)
    }
    const onClickPrevHandler = () => {
        if(currentStep >= 0 && currentStep !== 0) {
            setCurrentStep((prevValue) => prevValue - 1)
            setStepData((prevValue) => {
                return prevValue.filter((item: any) => item.data !== value[currentStep - 1].data)
            })
       }
    }
    const onClickNextHandler = () => {
        if(currentStep <= value.length - 1) {
            setCurrentStep((prevValue) => prevValue + 1)
            setStepData((prevValue) => [...prevValue, value[currentStep]])
        }
    }
    const clearPreviousStepsData = (step: number) => {
        let newDataStep = []
        for(let i = 0; i < step; i+=1) {
            newDataStep.push(value[i])
        }
        setStepData(newDataStep)
    }

    const cleanStepRunningStates = () => {
        setCurrentStep(0)
        setStepData([])
    }
    return (
        <>
            <Controls currentStep={currentStep} changeCurrentStepCallback={changeCurrentStepCallback} cleanStepRunningStates={cleanStepRunningStates} setStepRunning={setStepRunning}/>
            <div>
                {/*{isPending && <p>loading...</p>}*/}
                <Title>
                    Входные данные
                </Title>
                <GrayBlock>
                    {/*<textarea value={value} onChange={onChangeHandler} name="" id="" cols="30"*/}
                    {/*          rows="10" />*/}
                    <JSONInput height="400px" locale={locale} placeholder={value} onBlur={onChangeHandler}/>
                </GrayBlock>
                {errors && <ErrorMsg>{errors.reason} On line: {errors.line}</ErrorMsg>}

                <ButtonPrimary onClick={onClickHandler}>Run</ButtonPrimary>
            </div>

            {stepRunning &&
                <>
                    <div style={{display: 'flex', gap: '50px'}}>
                        <ButtonPrimary onClick={onClickPrevHandler}> {'<<<<<'} </ButtonPrimary>
                        <ButtonPrimary onClick={onClickNextHandler}> {'>>>>>>>'} </ButtonPrimary>
                    </div>

                    <input type="number" value={currentStep} onChange={(e) => {
                        changeCurrentStepCallback(Number(e.target.value))
                    }} />

                    <div>
                        <Output steps={steps} data={stepData}/>
                    </div>
                </>
            }

            {(!errors && !stepRunning) &&
                <div>
                    <Output steps={steps} data={value}/>
                </div>
            }
        </>
    )
}

export default App
