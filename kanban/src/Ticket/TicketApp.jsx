import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faSortDown} from '@fortawesome/free-solid-svg-icons';
import './Tickert.css'
import { TicketTable } from './Ticket';
import { useDispatch, useSelector } from 'react-redux';
import { setGroupBy, setSortBy } from './actions';

export const sortTickets = (groupedTickets, sortKey) => {
    if (!sortKey) {
      return groupedTickets;
    }
  
    return groupedTickets.map((group) => ({
      groupKey: group.groupKey,
      tickets: group.tickets.sort((a, b) => {
        const aValue = typeof a[sortKey] === 'number' ? a[sortKey] : 0;
        const bValue = typeof b[sortKey] === 'number' ? b[sortKey] : 0;
  
        return bValue - aValue;
      }),
    }));
  };
  
  const TicketApp = () => {
    const [tickets, setTickets] = useState([]);
    const [groupedAndSortedTickets, setGroupedAndSortedTickets] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dispatch = useDispatch();
    const groupBy = useSelector((state) => state.tickets.groupBy);
    const sortBy = useSelector((state) => state.tickets.sortBy);
  
    const saveUserPreferences = useCallback(() => {
      localStorage.setItem('groupBy', groupBy);
      localStorage.setItem('sortBy', sortBy);
    }, [groupBy, sortBy]);
  
    const groupAndSortTickets = useCallback(() => {
      const groupTickets = (groupKey) => {
        if (!groupKey) {
          return [];
        }
  
        if (groupKey === "status") {
          const predefinedStatuses = ['Backlog','Todo', 'In progress', 'Done', 'Cancelled',];
          const grouped = tickets.reduce((result, ticket) => {
            const key = ticket[groupKey];
            const statusIndex = predefinedStatuses.indexOf(key);
    
            console.log('key:', key);
            console.log('statusIndex:', statusIndex);
    
            if (statusIndex === -1) {
              return result;
            }
    
            const predefinedKey = statusIndex >= 0 ? predefinedStatuses[statusIndex] : key;
    
            if (!result[predefinedKey]) {
              result[predefinedKey] = [];
            }
    
            result[predefinedKey].push(ticket);
            return result;
          }, {});
    
          return predefinedStatuses.map((key) => ({
            groupKey: key,
            tickets: grouped[key] || [],
          }));
        } else {
          const grouped = tickets.reduce((result, ticket) => {
            const key = ticket[groupKey];
            if (!result[key]) {
              result[key] = [];
            }
            result[key].push(ticket);
            return result;
          }, {});
    
          return Object.keys(grouped).map((key) => ({
            groupKey: key,
            tickets: grouped[key],
          }));
        }
      };
  
      let groupedTickets = groupTickets(groupBy);
      groupedTickets = sortTickets(groupedTickets, sortBy);
  
      setGroupedAndSortedTickets(groupedTickets);
    }, [groupBy, sortBy, tickets]);
  
    const sortTickets = (groupedTickets, sortKey) => {
      if (!sortKey) {
        return groupedTickets;
      }
  
      return groupedTickets.map((group) => ({
        groupKey: group.groupKey,
        tickets: group.tickets.sort((a, b) => b[sortKey] - a[sortKey]),
      }));
    };
  
    useEffect(() => {
      axios
        .get('https://api.quicksell.co/v1/internal/frontend-assignment')
        .then((response) => {
          const fetchedTickets = response.data.tickets;
          const fetchedUsers = response.data.users;
          const ticketsWithUsers = fetchedTickets.map((ticket) => {
            const user = fetchedUsers.find((user) => user.id === ticket.userId);
            return { ...ticket, user };
          });
  
          setTickets(ticketsWithUsers);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []); 
  
    useEffect(() => {
      groupAndSortTickets();
      saveUserPreferences();
    }, [groupBy, sortBy, groupAndSortTickets, saveUserPreferences]);
  
    return (
      <div>
        <div className="header">
          <button
            className="display-button"
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          >
            <FontAwesomeIcon icon={faSlidersH} /> Display <FontAwesomeIcon icon={faSortDown} />
          </button>
          {isDropdownVisible && (
            <div className="dropdown">
              <div className="grpsort">
                <label>Grouping:</label>
                <select onChange={(e) => dispatch(setGroupBy(e.target.value))} value={groupBy}>
                  <option value="status">Status</option>
                  <option value="priority">Priority</option>
                  <option value="userId">User</option>
                </select>
              </div>
              <div className="grpsort">
                <label>Ordering:</label>
                <select onChange={(e) => dispatch(setSortBy(e.target.value))} value={sortBy}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <TicketTable groupedAndSortedTickets={groupedAndSortedTickets} groupBy={groupBy} />
      </div>
    );
  };
  
  export default TicketApp;