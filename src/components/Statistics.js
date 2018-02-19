import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatisticsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const StatisticContainer = styled.View`
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
    <Number>{number}</Number>
    <Title>{title}</Title>
  </StatisticContainer>
);

const Statistics = ({ children }) => <StatisticsContainer>{children}</StatisticsContainer>;
Statistics.Item = StatisticsItem;

export default Statistics;
