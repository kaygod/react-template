import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepCopy } from "@/utils/common";


interface customeType {
  cus_id:string | null,  // 客户id
  service_status:string | null, // 托管状态
  cus_name:string, // 企业名称
  mobile:string, // 手机号码 
  email:string, // 电子邮箱
  wallet_address:string // 钱包地址
}

interface harvestItemType {
  msg_type:string	,//奖励类型	String	1：农池奖励；2：农场奖励
  date:string	,//时间	String	2021-05-01 12:12：:1
  number:string	,//数量	一维数组	0：数字；1：单位。[‘0.08’,’xch’]
  service_ip:string	,//服务器ip	String	
}

//收获列表
interface harvestType {
  date:[string,string] | null, //开始日期和结束日期
  harvest:[string,string] | null, //值和单位
  msg_type:number | null,
  service_ip:string, //农名机ip地址
  list:harvestItemType[], //列表数据
  page_no:number,
  total_page:number,
  tableRef:React.MutableRefObject<any> | null
}


interface transferItemType {
  msg_type:string	,//奖励类型	String	1：农池奖励；2：农场奖励
  date:string	,//时间	String	2021-05-01 12:12：:1
  number:string	,//数量	一维数组	0：数字；1：单位。[‘0.08’,’xch’]
  service_ip:string	,//服务器ip	String
  wallet_address1:"", // 钱包发送地址
  wallet_address2:""	// 钱包接收地址
}


// 转账列表
interface transferType {
  date:[string,string] | null, //开始日期和结束日期
  transfer:[string,string] | null, //值和单位
  service_ip:string, //农名机ip地址
  list:transferItemType[], //列表数据
  page_no:number,
  total_page:number,
  tableRef:React.MutableRefObject<any> | null
}


interface serviceItemType {
  service_ip:""	,// 服务器ip	String	
  p_number:""	,// 绘图数	number	number
  p_space:[string,string]	,// 绘图大小	一维数组	0：数字；1：单位。[‘0.08’,’xch’]
  p_ing:string	,// 正在p图数量	String	
  harvest_total:string	,// 总收获	String	
  status:string	,// 状态	String	1：启动；2：下架
}

//机器数据
interface serviceType{
  page_no:number,
  total_page:number,
  list:serviceItemType[],
  status:number // 状态	0:全部  1：启动；2：下架
}

interface globalType {
  status:pageType
}


export interface dataType {
  global:globalType,
  customeData:customeType,
  harvestData:harvestType,
  transferData:transferType,
  serviceData:serviceType
}

export interface superDataType extends dataType{
  [prop:string]:any
}

export enum pageType {
  view = 1,
  edit = 2
}

export const getter = (state: any): dataType => {
  return state.ClientManage;
};

export const counterSlice = createSlice({
  name: 'ClientManage',
  initialState: {
    global:{
      status:pageType.view
    },
    customeData:{
      cus_id:null,  // 客户id
      service_status:null, // 托管状态
      cus_name:"", // 企业名称
      mobile:"", // 手机号码 
      email:"", // 电子邮箱
      wallet_address:"" // 钱包地址
    },
    harvestData:{
      date:null,
      msg_type:0,
      service_ip:"",
      page_no:1,
      total_page:1,
      harvest:null,
      list:[],
      tableRef:null
    },
    transferData:{
      date:null, //开始日期和结束日期
      service_ip:'', //农名机ip地址
      page_no:1,
      total_page:1,
      transfer:null, //值和单位
      list:[], //列表数据
      tableRef:null
    },
    serviceData:{
      page_no:1,
      total_page:1,
      list:[],
      status:0
    }
  } as dataType,
  reducers: {
    updateRef(state,action: PayloadAction<any>){

    },
    //修改数据的方法
    updateData(state,action: PayloadAction<{ key_name:any[]; value: any[] }>){
        const { key_name, value } = action.payload;
        key_name.forEach((key,index)=>{
          const array = key.split(".")
          const last = array.pop();
          const ob = array.reduce((cur:any,next:string)=>{
            return cur[next];
          },state) || state;
          ob[last] = value[index];
        })
    },
    test(state,action: PayloadAction<{ key_name: keyof dataType; value: string }>){
        const { key_name, value } = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateData
} = counterSlice.actions;

export * from './service';

export default counterSlice.reducer;
