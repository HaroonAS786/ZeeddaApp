import {configureStore} from '@reduxjs/toolkit';
import auth from '../reducers/auth/reducers';

const storeOptions = {
  reducer: {
    auth: auth.reducer,
  },
};

const store = configureStore(storeOptions);

export default store;
