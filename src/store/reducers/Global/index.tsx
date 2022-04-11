import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetch } from '@/utils/common';

export const counterSlice = createSlice({
  name: 'Global',
  initialState: {
    navigation: {},
  },
  reducers: {
    //更该标签
    getNav(state, action) {
      state.navigation = action.payload;
    },
    noOperate(state) {
      return state;
    },
  },
});

export const getNavigation = (state: any) => {
  return state.Global.navigation;
};

// Action creators are generated for each case reducer function
export const { getNav, noOperate } = counterSlice.actions;

export const getNavAsync = () => async (dispatch: Function) => {
  const response = await fetch({
    url: '/service_admin/admin/navigation',
    data: {},
  });
  dispatch(getNav(response));
};

export const logoutAsync = () => async (dispatch: Function) => {
  await fetch({
    url: '/service_admin/admin/logout',
    data: {},
  });
  dispatch(noOperate());
};

export default counterSlice.reducer;
