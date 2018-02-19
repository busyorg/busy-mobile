import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import numeral from 'numeral';

function formatNumber(number) {
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
`;

const StatisticContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const Number = styled.Text`
  font-weight: bold;
`;

const Title = styled.Text`
  color: rgba(0, 0, 0, 0.54);
`;

const StatisticsItem = ({ number, title }) => (
  <StatisticContainer>
    <Number>{formatNumber(number)}</Number>
    <Title>{title}</Title>
  </StatisticContainer>
);
StatisticsItem.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
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
