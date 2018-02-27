import React from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components';
import numeral from 'numeral';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Container = styled.View`
  background: #fafafa;
  padding: 0 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Data = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Counter = styled.View`
  padding: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CounterText = styled.Text`
  color: rgba(0, 0, 0, 0.54);
  font-weight: 500;
  font-size: 16px;
  margin-left: 8px;
`;

const Footer = ({ upvoteCount, commentCount, payout }) => (
  <Container>
    <Data>
      <TouchableNativeFeedback>
        <Counter>
          <MaterialCommunityIcons
            name="arrow-up-bold-circle"
            size={18}
            color="rgba(0, 0, 0, 0.54)"
          />
          <CounterText>{upvoteCount}</CounterText>
        </Counter>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback>
        <Counter>
          <MaterialCommunityIcons name="comment-text" size={18} color="rgba(0, 0, 0, 0.54)" />
          <CounterText>{commentCount}</CounterText>
        </Counter>
      </TouchableNativeFeedback>
    </Data>
    <Data>
      <Counter>
        <CounterText>{numeral(payout).format('$0.00')}</CounterText>
      </Counter>
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
