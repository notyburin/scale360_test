import {
  FETCH_PROMOTION_START,
  FETCH_PROMOTION_SUCCESS,
} from '../actions';

const initState = {
  isFetching: false,
  promotionList: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_PROMOTION_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PROMOTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employeeList: action.list,
      };
    default:
      return state;
  }
};
