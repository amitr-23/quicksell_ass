import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamation,faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import './Tickert.css'

export const getPriorityIcon = (priority) => {
    if (typeof priority === 'undefined') {
      return null; 
    }
    switch (priority) {
      case 0:
        return (
          <div style={{ backgroundColor: 'grey', padding: '2.5px', borderRadius: 5 }}>
            <FontAwesomeIcon icon={faEllipsisH} style={{ color: 'white' }} />
          </div>
        );
      case 1:
        return (
          <div style={{ padding: '2.5px', borderRadius: 5 }}>
            <img
              src="https://img.icons8.com/carbon-copy/100/medium-connection.png"
              alt=""
              style={{ width: '20px', height: '20px', borderRadius: '50%' }}
            />
          </div>
        );
      case 2:
        return (
          <div style={{ padding: '2.5px', borderRadius: 5 }}>
            <img
              src="https://img.icons8.com/ios-filled/50/medium-connection.png"
              alt=""
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        );
      case 3:
        return (
          <div style={{ padding: '2.5px', borderRadius: 5 }}>
            <img
              src="https://img.icons8.com/ios-filled/50/high-connection.png"
              alt="high-connection"
              style={{ width: '20px', height: '20px' }}
            />
          </div>
        );
      case 4:
        return (
          <div style={{ backgroundColor: 'orange', padding: '2.5px', borderRadius: 5 }}>
            <FontAwesomeIcon icon={faExclamation} style={{ color: 'white' }} />
          </div>
        );
      default:
        return '';
    }
  };

  export const getStatusIcon = (status) => {
    if (typeof status === 'undefined') {
      return null; 
    }
    switch (status) {
      case 'Backlog':
        return (
          <div style={{ padding: '2.5px', borderRadius: "50%",color: "#ddd9d9" }}>
              <img width="20vh" height="20vh" style={{marginTop:'1vh'}} src="https://img.icons8.com/ios-filled/50/000000/inactive-state.png" alt="inactive-state"/>
          </div>
        );
      case 'Todo':
        return (
          <div style={{ padding: '2.5px', borderRadius: '50%'}}>
            <img width="20vh" height="20vh" style={{marginTop:'1vh'}} src="https://img.icons8.com/ios/50/000000/circle-thin--v1.png" alt="circle-thin--v1"/>
          </div>
        );
      case 'In progress':
        return (
          <div style={{ padding: '2.5px', borderRadius: 5 }}>
            <img width="20vh" height="20vh" style={{marginTop:'1vh'}} src="https://img.icons8.com/ios-filled/50/000000/50-percents.png" alt="50-percents"/>
          </div>
        );
      default:
        return '';
    }
  };