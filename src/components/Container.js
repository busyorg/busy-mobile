// @flow

import styled, { css } from 'styled-components';

const Container = styled.View`
  background-color: white;

  ${({ full }) =>
    full &&
    css`
      flex: 1;
    `};
`;

export default Container;
