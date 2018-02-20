import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3030';

export const FETCH_PROMOTION_START = 'FETCH_PROMOTION_START';
export const FETCH_PROMOTION_SUCCESS = 'FETCH_PROMOTION_SUCCESS';

export const fetchPromotionStart = () => ({
  type: FETCH_PROMOTION_START,
});

export const fetchPromotionSuccess = discount => ({
  type: FETCH_PROMOTION_SUCCESS,
  discount,
});

export const calculatePromotion = input => (dispatch) => {
  dispatch(fetchPromotionStart());
  return axios.get('/promotions')
    .then((res) => {
      const { people, couponCode, billTotal } = input;
      const promotionList = res.data;
      const promoMatch = promotionList.filter(obj => (
        (
          (obj.coupon_code === couponCode && obj.bill_more_than === null) ||
          (billTotal >= obj.bill_more_than && obj.bill_more_than !== null)
        ) &&
        (
          obj.required_person === null || parseInt(people, 10) % obj.required_person === 0
        )
      ));
      let discount = 0;
      promoMatch.forEach((obj) => {
        if (obj.discount > discount) {
          ({ discount } = obj);
        }
      });

      dispatch(fetchPromotionSuccess(discount));
    });
};
