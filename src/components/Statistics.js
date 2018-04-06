// @flow

import * as React from 'react';
import styled from 'styled-components';
import StatisticsItem from './StatisticsItem';

const StatisticsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  children: React.Node,
};

const Statistics = ({ children }: Props) => <StatisticsContainer>{children}</StatisticsContainer>;
Statistics.defaultProps = {
  children: null,
};

Statistics.Item = StatisticsItem;

export default Statistics;
