import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'react-native';
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

export default class Comment extends React.PureComponent {
  static propTypes = {
    author: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    level: PropTypes.number,
    getComments: PropTypes.func,
  };

  static defaultProps = {
    commentCount: 0,
    level: 1,
    getComments: () => {},
  };

  loadRepliesClick = () => this.props.getComments(this.props.id);

  render() {
    const { level, author, contents, commentCount } = this.props;
    return (
      <CommentContainer>
        <LevelIndicator level={level} />
        <Main>
          <React.Fragment>
            <Username>
              {author} - {commentCount}
            </Username>
            <Content>
              <Text>{contents}</Text>
            </Content>
            {commentCount > 0 && (
              <Button title={`Show ${commentCount} children`} onPress={this.loadRepliesClick} />
            )}
          </React.Fragment>
        </Main>
      </CommentContainer>
    );
  }
}
