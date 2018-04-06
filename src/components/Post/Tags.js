// @flow

import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 16px;
`;

type Props = {
  tags: Array<string>,
  onSelect: (tag: string) => void,
};

const Tags = ({ tags, onSelect }: Props) => (
  <Container>
    {tags.map(tag => <Tag key={tag} name={tag} onPress={() => onSelect(tag)} />)}
  </Container>
);
Tags.defaultProps = {
  tags: [],
  onSelect: () => {},
};

export default Tags;
