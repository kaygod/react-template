import React,{forwardRef,useEffect,useImperativeHandle} from 'react'
import "./index.less";

interface propType {
    msg: string;
    destory:Function,
    time:number
};


const AlertComponent  = forwardRef((props:propType,ref)=> {

        const { destory,time,msg} = props;

        useEffect(()=>{
            const timer = setTimeout(() => {
                clearTimeout(timer);
                destory();
            }, time);
        },[])

        useImperativeHandle(ref, () => ({
            destory: () => {
                destory();
            }
        }));

        return (<div className="alert">
            <div className="ant-message-notice-content">
                <div className="ant-message-custom-content ant-message-info">
                    <span role="img" aria-label="info-circle" className="anticon anticon-info-circle">
                 <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>
                </span><span>{msg}</span></div></div>
        </div>)
})


export default AlertComponent;