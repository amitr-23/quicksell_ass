import React from 'react';
import { Provider } from 'react-redux';
import store from './Ticket/store';
import './App.css';
import TicketApp from './Ticket/TicketApp';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <TicketApp/>
    </div>
    </Provider>
  );
}

export default App;
