import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { calculatePromotion } from '../actions';
import InputFormGroup from './InputFormGroup';

const Card = styled.div`
  margin: 40px auto 0;
  width: 100%;
  max-width: 600px;
  background-color: WhiteSmoke;
`;

const CardTitle = styled.h2`
  text-align: center;
  padding-bottom: 30px;
`;

const Loading = styled.h5`
  padding: 7px 0;
  margin-bottom: 0;
`;

const ButtonCol = styled.div`
  text-align: center;
`;

const Button = styled.button`
  width: 300px;
`;

class CalculateBill extends Component {
  constructor() {
    super();
    this.state = {
      price: 459,
      people: 0,
      couponCode: '',
      billTotal: 0,
      resetResult: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.calBillSummary = (total, discount) => total * ((100 - discount) / 100);
    this.money = number => (parseFloat(number)).toLocaleString('en');
  }

  calBillTotal() {
    const { price, people } = this.state;
    this.setState({ billTotal: (price * people) });
  }

  handleOnChange(e) {
    const { target: { id, value } } = e;
    this.setState({ resetResult: true });

    if (id === 'price' || id === 'people') {
      this.setState({ [id]: value }, this.calBillTotal);
    } else if (id === 'couponCode') {
      this.setState({ [id]: value.toUpperCase() });
    } else {
      this.setState({ [id]: value });
    }
  }

  handleSubmit() {
    this.setState({ resetResult: false });
    const { people, couponCode, billTotal } = this.state;
    const { dispatch } = this.props;
    dispatch(calculatePromotion({ people, couponCode, billTotal }));
  }

  render() {
    const { isFetching, discount } = this.props;
    const {
      price,
      people,
      couponCode,
      billTotal,
      resetResult,
    } = this.state;

    return (
      <Card className="card">
        <div className="card-body">
          <CardTitle className="card-title">Calculate bill</CardTitle>
          <InputFormGroup
            id="price"
            type="number"
            label="Buffet price"
            value={price}
            onChange={this.handleOnChange}
          />
          <InputFormGroup
            id="people"
            type="number"
            label="Number people"
            value={people}
            onChange={this.handleOnChange}
          />
          <InputFormGroup
            id="couponCode"
            type="text"
            label="Coupon code"
            value={couponCode}
            onChange={this.handleOnChange}
          />
          <InputFormGroup
            id="billTotal"
            type="text"
            label="Bill total"
            readonly
            value={this.money(billTotal)}
          />
          <div className="row">
            <ButtonCol className="col">
              {
                isFetching ?
                  <Loading>Loading...</Loading> :
                  <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >Calculate Promotions
                  </Button>
              }
            </ButtonCol>
          </div>
          <hr />
          <InputFormGroup
            id="discount"
            type="text"
            label="Discount"
            readonly
            value={resetResult ? '-' : `${discount} %`}
          />
          <InputFormGroup
            id="billTotal"
            type="text"
            label="Bill summary"
            readonly
            value={resetResult ? '-' : this.money(this.calBillSummary(billTotal, discount))}
          />
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { isFetching, discount } = state;

  return { isFetching, discount };
};

export default connect(mapStateToProps)(CalculateBill);
