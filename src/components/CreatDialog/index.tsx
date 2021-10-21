import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import './index.less'
export interface propType {
    destory?: Function,
    renderDom: any,
    title: string,
    confirmText?:string,
    cancelText?:string,
    confirmCallback?:Function,
    cancelCallback?:Function
};

const CreatDialog = forwardRef((props: propType, ref) => {
    const { destory=()=>{}, renderDom, title,confirmText='确认',cancelText='取消',confirmCallback=()=>{},cancelCallback=()=>{} } = props;

    const cancel = () => {
        props.destory&&props.destory()
        cancelCallback()
    }
    const newDom = () => {
        return renderDom()
    }
    const confirm=()=>{
        props.destory&&props.destory()
        confirmCallback()
    }
    useImperativeHandle(ref, () => ({
        destory: () => {
            destory();
        }
    }));

    return (
        <div className="pop_box">
            <div className="contain_box">
                <div className="title">
                    <div className="title_text">{title}</div>
                    <div className="close_btn" onClick={() => cancel()}></div>
                </div>
                <div className="render_content">
                {newDom()}
                </div>
                <div className="btn_box">
                    <div className="delete" onClick={() => { confirm() }}>{confirmText}</div>
                    <div className="cancel" onClick={() => { cancel() }}>{cancelText}</div>
                </div>
            </div>
        </div>
    )
})

export default CreatDialog