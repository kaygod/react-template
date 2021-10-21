import React,{useRef}  from "react";
import ReactDOM from 'react-dom';

/**
 * 弹框API
 */
export const Modal = (WrapComponent,props = {})=>{

    const Div = document.createElement("DIV");

    document.body.appendChild(Div);

    const destory = ()=>{
        ReactDOM.unmountComponentAtNode(Div);
        document.body.removeChild(Div);  
    }

    const notify = React.createRef();

    return new Promise((resolve)=>{
        ReactDOM.render(<WrapComponent {...props} ref={notify} destory={destory}/>,Div,()=>{
            resolve(notify);
        });
    })

}