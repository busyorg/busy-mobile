import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import numeral from 'numeral';

function formatNumber(number, displayStyle) {
  if (displayStyle === 'percent') {
    return numeral(number).format('0%');
  }
  let result = '';
  if (number < 10000) {
    result = `${number}`;
  } else {
    result = numeral(number).format('0.[0]a');
  }
  return result.toUpperCase();
}

const StatisticsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StatisticContainer = styled.View``;

const Number = styled.Text`
  font-size: 18px;
`;

const Title = styled.Text`
  color: rgba(0, 0, 0, 0.54);
`;

const StatisticsItem = ({ number, title, displayStyle }) => (
  <StatisticContainer>
    <Number>{formatNumber(number, displayStyle)}</Number>
    <Title>{title}</Title>
  </StatisticContainer>
);
StatisticsItem.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  displayStyle: PropTypes.oneOf(['number', 'percent']),
};
StatisticsItem.defaultProps = {
  displayStyle: 'number',
};

const Statistics = ({ children }) => <StatisticsContainer>{children}</StatisticsContainer>;
Statistics.propTypes = {
  children: PropTypes.node,
};
Statistics.defaultProps = {
  children: null,
};

Statistics.Item = StatisticsItem;

export default Statistics;
