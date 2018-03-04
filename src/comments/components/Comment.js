import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';

const colors = ['#F44336', '#2196F3', '#4CAF50', '#FFEB3B', '#FF5722'];

const CommentContainer = styled.View`
  flex-direction: row;
  padding-right: 8px;
`;

const LevelIndicator = styled.View`
  margin: 2px 8px 2px ${({ level }) => level * 4}px;
  width: 2px;
  border-radius: 1px;
  background: ${({ level }) => colors[(level - 1) % colors.length]};
`;

const Main = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: 2px 0;
`;

const Username = styled.Text`
  margin-top: 2px;
  color: ${Colors.secondaryText};
`;

export default function Comment({ level, author, contents }) {
  return (
    <CommentContainer>
      <LevelIndicator level={level} />
      <Main>
        <React.Fragment>
          <Username>{author}</Username>
          <Content>
            <Text>{contents}</Text>
          </Content>
        </React.Fragment>
      </Main>
    </CommentContainer>
  );
}
Comment.propTypes = {
  author: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  level: PropTypes.number,
};
Comment.defaultProps = {
  level: 1,
};
