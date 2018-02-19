import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030';

export const FETCH_PROMOTION_START = 'FETCH_PROMOTION_START';
export const FETCH_PROMOTION_SUCCESS = 'FETCH_PROMOTION_SUCCESS';

export const fetchPromotionStart = () => ({
  type: FETCH_PROMOTION_START,
});

export const fetchPromotionSuccess = res => ({
  type: FETCH_PROMOTION_SUCCESS,
  list: res.data,
});

export const fetchPromotion = () => (dispatch) => {
  dispatch(fetchPromotionStart());
  return axios.get('/employees')
    .then((res) => {
      dispatch(fetchPromotionSuccess(res));
    });
};
