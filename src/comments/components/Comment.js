// @flow

import * as React from 'react';
import { Text, Button } from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import CommentsContainer from '../containers/CommentsContainer';

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

type Props = {
  id: number,
  author: string,
  contents: string,
  commentCount: number,
  level: number,
  commentsLoading: boolean,
  commentsLoaded: boolean,
  getComments: (postId: number) => void,
};

export default class Comment extends React.PureComponent<Props> {
  static defaultProps = {
    commentCount: 0,
    level: 1,
    getComments: () => {},
  };

  loadRepliesClick = () => {
    this.props.getComments(this.props.id);
  };

  render() {
    const {
      id,
      level,
      author,
      contents,
      commentCount,
      commentsLoaded,
      commentsLoading,
    } = this.props;

    const shouldShowButton = !commentsLoaded && !commentsLoading && commentCount > 0;

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
            {shouldShowButton && <Button title="Show replies" onPress={this.loadRepliesClick} />}
            <CommentsContainer autoload={false} id={id} />
          </React.Fragment>
        </Main>
      </CommentContainer>
    );
  }
}
