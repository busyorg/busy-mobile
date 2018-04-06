// @flow

import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';

function formatNumber(number: number, displayStyle?: 'percent' | 'number') {
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

const StatisticContainer = styled.View``;

const Number = styled.Text`
  font-size: 18px;
`;

const Title = styled.Text`
  color: rgba(0, 0, 0, 0.54);
`;

type Props = {
  number: number,
  title: string,
  displayStyle: 'number' | 'percent',
};

const StatisticsItem = ({ number, title, displayStyle }: Props) => (
  <StatisticContainer>
    <Number>{formatNumber(number, displayStyle)}</Number>
    <Title>{title}</Title>
  </StatisticContainer>
);
StatisticsItem.defaultProps = {
  displayStyle: 'number',
};

export default StatisticsItem;
