import * as actions from './index';
import { fetch, deepCopy } from '@/utils/common';
import { getter,superDataType } from "./index";
import { globalRef } from "@/views/HomePage";

export const updateInitState = (search:string)=> async (
  dispatch: Function
) =>{
  return new Promise((resolve)=>{
    if(search.startsWith("?")){
      search = search.slice(1);
    }
    const array = search.split("&");
    const params:string[] = [];
    array.forEach((item)=>{
      const [key,value] = item.split("=");
      params.push(value);
    })
    dispatch(actions.updateData({
      key_name:["customeData.cus_id","customeData.service_status"],
      value:params
    }));
    Promise.resolve().then(()=>{
      dispatch(getCustomeData())
    })
    resolve(null);  
  })
}

/**
 * 获取客户信息数据
 */
export const getCustomeData = () => async (
  dispatch: Function,
  getState: Function
)=>{

  const { customeData:{ cus_id } } = getter(getState());

  const response: any = await fetch({
    url: '/service_admin/chia_cus/detail',
    data: {
      cus_id
    },
  }) || {};

  if(!response.customer){
    response.customer =  {};
  }

  const { customer:{ cus_name,mobile,email,wallet_address } } = response;

  dispatch(actions.updateData({
    key_name:["customeData.cus_name","customeData.mobile","customeData.email","customeData.wallet_address"],
    value:[cus_name,mobile,email,wallet_address]
  }));

}

/**
 * 
 * 收获列表
 * @param page_no 
 * @returns 
 */
export const queryHarvestList = (page_no?: number)=> async (
  dispatch: Function,
  getState: Function
) => {

  const { harvestData,customeData } = getter(getState());

  const {  date,service_ip,msg_type  } = harvestData;

  const response: any = await fetch({
    url: '/service_admin/chia/harvest_list',
    data: {
      cus_id:customeData.cus_id,
      service_ip,
      start_date:date?date[0]:"",
      end_date:date?date[1]:"",
      msg_type:msg_type || 0,
      page_no: page_no != null ? page_no : harvestData.page_no,
    },
  });

  response.msg_list.forEach((item: any, index: number) => {
    item.code = index + 1;
  });

  const {total,msg_list,harvest  } = response;

  dispatch(actions.updateData({
    key_name:[
         "harvestData.harvest",
         "harvestData.list",
         "harvestData.total_page"
        ],
    value:[harvest,msg_list,total]
  }));

  if (page_no != null) {
    dispatch(actions.updateData({
      key_name:["harvestData.page_no"],
      value:[page_no]
    }));
  }

}

/**
 * 转账列表
 * @param page_no 
 * @returns 
 */
export const queryTransferList = (page_no?: number)=> async (
  dispatch: Function,
  getState: Function
) => {

  const { transferData,customeData } = getter(getState());

  const {  date,service_ip  } = transferData;

  const response: any = await fetch({
    url: '/service_admin/chia/transfer_list',
    data: {
      cus_id:customeData.cus_id,
      service_ip,
      start_date:date?date[0]:"",
      end_date:date?date[1]:"",
      page_no: page_no != null ? page_no : transferData.page_no,
    },
  });

  response.msg_list.forEach((item: any, index: number) => {
    item.code = index + 1;
  });

  const {total,msg_list,transfer  } = response;

  dispatch(actions.updateData({
    key_name:[
         "transferData.transfer",
         "transferData.list",
         "transferData.total_page"
        ],
    value:[transfer,msg_list,total]
  }));

  if (page_no != null) {
    dispatch(actions.updateData({
      key_name:["transferData.page_no"],
      value:[page_no]
    }));
  }

}


/**
 *  机器列表数据
 */
export const queryServiceList = (page_no?: number)=> async (
  dispatch: Function,
  getState: Function
) => {

  const { serviceData,customeData} = getter(getState());

  const {  status  } = serviceData;

  const response: any = await fetch({
    url: '/service_admin/chia/service_list',
    data: {
      cus_id:customeData.cus_id,
      status,
      page_no: page_no != null ? page_no : serviceData.page_no,
    },
  });

  response.msg_list.forEach((item: any, index: number) => {
    item.code = index + 1;
  });

  const { total,msg_list  } = response;

  dispatch(actions.updateData({
    key_name:[
         "serviceData.list",
         "serviceData.total_page"
        ],
    value:[msg_list,total]
  }));

  if (page_no != null) {
    dispatch(actions.updateData({
      key_name:["serviceData.page_no"],
      value:[page_no]
    }));
  }

}

/**
 * 更新输入框 或者 日期框的值 或者 tableRef
 */
export const setData = (type:string,value:any)=> async (
  dispatch: Function,
  getState: Function
) => {
  dispatch(actions.updateData({
    key_name:[
          type
    ],
    value:[value]
  }));
  return Promise.resolve(null);
}

/**
 * 翻页函数
 */
export const updatePage = (type:string,value:number)=> async (
  dispatch: Function
) => {
  if(type === "harvestData"){
    dispatch(queryHarvestList(value));
  }else if(type === "transferData"){
    dispatch(queryTransferList(value));
  }else if(type === "serviceData"){
    dispatch(queryServiceList(value));
  }
}

/**
 * 点击默认按钮
 *  
 */
export const defaultClick = (type:string) => async (
  dispatch: Function,
  getState: Function
) => {
  
  const tableRef = globalRef.value;

  let options:any = null;

  if(type === "harvestData"){ // 收货记录
   options = {
    date:null,
    msg_type:0,
    service_ip:"",
    page_no:1,
    total_page:1,
   }
  }else if(type === "transferData"){ // 转账记录
    options = {
      date:null, //开始日期和结束日期
      service_ip:'', //农名机ip地址
      page_no:1,
      total_page:1,
    }
  }

  if(!options){
    return;
  }

  const array = Object.keys(options);

  const key_name:string[] = [];
  const value:string[] = [];

  array.forEach((key,index)=>{
     key_name.push(`${type}.${key}`);
     value.push(options[key]);
  })

  tableRef && tableRef.current && tableRef.current.reset();

  dispatch(actions.updateData({
    key_name,
    value
  }));

  Promise.resolve().then(()=>{
    if(type === "harvestData"){ // 收货记录
      dispatch(queryHarvestList())
    }else if(type === "transferData"){ // 转账记录
      dispatch(queryServiceList())
    }
  })

}

