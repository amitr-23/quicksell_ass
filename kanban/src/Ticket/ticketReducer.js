const storedGroupBy = localStorage.getItem('groupBy');
const storedSortBy = localStorage.getItem('sortBy');

const initialState = {
  groupBy: storedGroupBy || 'status',
  sortBy: storedSortBy || 'priority',
};
  
  const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GROUP_BY':
          return { ...state, groupBy: action.payload };
    
        case 'SET_SORT_BY':
          return { ...state, sortBy: action.payload };
    
        default:
          return state;
      }
  };
  
  export default ticketReducer;