import React from 'react';
import './index.less';

type defaultProps = {
  call: string; //按钮的详情
  orange?: string; // 背景颜色
  lit_gray?:string;//小型灰色按钮
  onClick?: any;
};

const Button = (props: defaultProps) => {
  return (
    <div
      className={`buttoo ${props.orange ? props.orange : ''} ${props.lit_gray ? props.lit_gray : ''}`}
      onClick={props.onClick}
    >
      {props.call}
    </div>
  );
};

export default Button;
