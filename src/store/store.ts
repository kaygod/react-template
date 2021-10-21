import { configureStore } from '@reduxjs/toolkit';
import Global from '@/store/reducers/Global';


const store = configureStore({
  reducer: {
    Global,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
