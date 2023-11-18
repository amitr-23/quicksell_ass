import React from 'react';
import './Tickert.css'
import { getPriorityIcon } from './getPriorityIcon';
import { getStatusIcon } from './getPriorityIcon';
import TicketCard from './TicketCard';


export const TicketTable = ({ groupedAndSortedTickets,groupBy }) => {
  const mapPriorityToLabel = (priority) => {
    const priorityLabels = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority',
    };
    return priorityLabels[priority] || '';
  };

  return (
    <div className="table-container">
      {groupedAndSortedTickets.map((group) => (
        <div key={group.groupKey} className="group-container">
          <div className="heading">
          <h4 className={groupBy === 'userId' ? 'user-heading' : groupBy === 'priority' ? 'priority-heading' :groupBy === 'status' ? 'priority-heading' :''}>
          {
          groupBy === 'priority' ?
              <>
                <div className="priority-icon">
                    {group.tickets.length > 0 && group.tickets[0].priority !== undefined ? (
                      getPriorityIcon(group.tickets[0].priority)
                    ) : (
                      <div>No Priority Icon</div>
                    )}
                  </div>
                  {mapPriorityToLabel(group.groupKey)}
               </>
              :
               groupBy === 'userId' && group.tickets[0]?.user?
               (
                 
                 <>
                  <div
                    className="avatar"
                    style={{
                      marginRight: '5px',
                    }}
                  >
                    {group.tickets[0].user.name[0]}
                  </div>
                    {group.tickets[0].user.name}
                </>
              )
              : groupBy === 'status' ?
              <>
                <div className="priority-icon">
                    {group.tickets.length > 0 && group.tickets[0].status !== undefined ? (
                      getStatusIcon(group.tickets[0].status)
                    ) : (
                      group.groupKey==='Done' ?
                      <div style={{ padding: '2.5px', borderRadius: 5 }}>
                        <img width="20vh" height="20vh" style={{marginTop:'1vh'}}src="https://img.icons8.com/color/48/000000/checked--v1.png" alt="checked--v1"/>
                      </div> : group.groupKey==='Cancelled'?
                      <div style={{padding: '2.5px', borderRadius: 5 }}>
                      <img width="20vh" height="20vh" style={{marginTop:'1vh'}} src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/000000/external-cross-interface-royyan-wijaya-detailed-outline-royyan-wijaya-2.png" alt=" "/>
                    </div>: <div>No icon </div>
                    )}
                  </div>
                  {group.groupKey}
               </>
              :group.groupKey}
          </h4>
          </div>
          <div className="ticket-group">
            {group.tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};




