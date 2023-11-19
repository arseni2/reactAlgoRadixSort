import React from 'react';
import {ListType} from "./App";

type propsType = {data: Array<ListType> | [], steps: Array<string>}
const Output = (props: propsType) => {
    console.log(props.data)
    return (
        <>
            <ol className='ol-li'>
                {props.data && props.data.map((item) => {
                    return <li>{item?.data}</li>
                })}
            </ol>

            <div style={{ height: '300px'}} className='text-hidden'>
                {props.steps.map((step) => {
                    return <div>{step}</div>
                })}
            </div>
        </>
    );
};

export default Output;