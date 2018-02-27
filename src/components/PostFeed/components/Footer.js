import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import numeral from 'numeral';

const Container = styled.View`
  padding: 0 16px 8px;
  flex-direction: row;
  justify-content: space-between;
`;

const Data = styled.View``;

const Count = styled.Text`
  color: rgba(0, 0, 0, 0.54);
  font-weight: 500;
  font-size: 16px;
`;

const Footer = ({ upvoteCount, commentCount, payout }) => (
  <Container>
    <Data>
      <Count>
        {upvoteCount} {commentCount}
      </Count>
    </Data>
    <Data>
      <Count>{numeral(payout).format('$0.00')}</Count>
    </Data>
  </Container>
);
Footer.propTypes = {
  upvoteCount: PropTypes.number,
  commentCount: PropTypes.number,
  payout: PropTypes.number,
};
Footer.defaultProps = {
  upvoteCount: 0,
  commentCount: 0,
  payout: 0,
};

export default Footer;
