import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle} from '@fortawesome/free-solid-svg-icons';
import './Tickert.css'
import { getPriorityIcon } from './getPriorityIcon';

const TicketCard = ({ ticket }) => {
    return (
      <div  className='card'>
        <div className="con1">
        <p>{ticket.id}</p>
        <div>
          {ticket.user ? (
            <div>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '5px',
                  padding:'5px',
                }}
              >
                {ticket.user.name[0]}
              </div>
            </div>
          ) : (
            'No User'
          )}
        </div>
        </div>
  
        <div className="con2">
        <p>{ticket.title}</p>
        </div>
        
       
        {/* <p>Status: {ticket.status}</p> */}
        <div className="con3">
          <div className="priority_icon">
           {getPriorityIcon(ticket.priority)}
           </div>
        <div className="tag">
        <FontAwesomeIcon icon={faCircle} style={{ color:'#ddd' , border:0, margin:5,padding:0}} />
        <p>{ticket.tag.join(', ')}</p>
        </div>
        </div>
      </div>
    );
  };

  export default TicketCard;