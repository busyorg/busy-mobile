// @flow

import styled, { css } from 'styled-components';

const Title = styled.Text`
  padding: 16px 16px 0 16px;
  font-size: 14px;
  font-weight: 500;

  ${({ narrow }) =>
    narrow &&
    css`
      padding-top: 0;
    `};
`;

export default Title;
