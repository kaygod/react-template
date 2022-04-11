import {dataType} from "./index"

interface stateType {
    ClientManage:dataType
}

export const getter = (state: stateType) => {
    return state.ClientManage;
};

export const getGlobal = (state: stateType) => {
    return state.ClientManage.global;
};

export const getCustomeData = (state: stateType) => {
    return state.ClientManage.customeData;
};

export const getHarvestData = (state: stateType) => {
    return state.ClientManage.harvestData;
};

export const getTransferData = (state: stateType) => {
    return state.ClientManage.transferData;
};

export const getServiceData = (state: stateType) => {
    return state.ClientManage.serviceData;
};

