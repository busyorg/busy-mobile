import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tag from './Tag';

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 8px;
`;

const Tags = ({ tags, onSelect }) => (
  <Container>
    {tags.map(tag => <Tag key={tag} name={tag} onPress={() => onSelect(tag)} />)}
  </Container>
);
Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
};
Tags.defaultProps = {
  tags: [],
  onSelect: () => {},
};

export default Tags;
