import { combineReducers } from '@reduxjs/toolkit';
import ticketReducer from './ticketReducer'; 

const rootReducer = combineReducers({
  tickets: ticketReducer,
});

export default rootReducer;