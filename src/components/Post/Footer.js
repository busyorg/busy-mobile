import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import numeral from 'numeral';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import CrossTouchable from '../CrossTouchable';

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

const Footer = ({
  upvoteCount,
  commentCount,
  payout,
  pendingVote,
  upvoted,
  onLikeClick,
  onCommentsClick,
}) => {
  let likeIcon = null;
  if (pendingVote) {
    likeIcon = <ActivityIndicator size="small" />;
  } else {
    likeIcon = (
      <MaterialCommunityIcons
        name="arrow-up-bold-circle"
        size={18}
        color={upvoted ? Colors.accent : Colors.secondaryText}
      />
    );
  }

  return (
    <Container>
      <Data>
        <CrossTouchable onPress={onLikeClick}>
          <Counter>
            {likeIcon}
            <CounterText>{upvoteCount}</CounterText>
          </Counter>
        </CrossTouchable>
        <CrossTouchable onPress={onCommentsClick}>
          <Counter>
            <MaterialCommunityIcons name="comment-text" size={18} color={Colors.secondaryText} />
            <CounterText>{commentCount}</CounterText>
          </Counter>
        </CrossTouchable>
      </Data>
      <Data>
        <Counter>
          <CounterText>{numeral(payout).format('$0.00')}</CounterText>
        </Counter>
      </Data>
    </Container>
  );
};
Footer.propTypes = {
  upvoteCount: PropTypes.number,
  commentCount: PropTypes.number,
  payout: PropTypes.number,
  upvoted: PropTypes.bool,
  pendingVote: PropTypes.bool,
  onLikeClick: PropTypes.func,
  onCommentsClick: PropTypes.func,
};
Footer.defaultProps = {
  upvoteCount: 0,
  commentCount: 0,
  payout: 0,
  upvoted: false,
  pendingVote: false,
  onLikeClick: () => {},
  onCommentsClick: () => {},
};

export default Footer;
