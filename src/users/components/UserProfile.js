// @flow

import React from 'react';
import UserHeaderContainer from '../containers/UserHeaderContainer';
import FeedContainer from '../../feed/containers/FeedContainer';

type Props = {
  name: string,
  loading: boolean,
  getUser: (username: string) => void,
};

export default class UserProfile extends React.Component<Props> {
  static defaultProps = {
    loading: true,
    getUser: () => {},
  };

  componentDidMount() {
    const { name, getUser } = this.props;
    getUser(name);
  }

  render() {
    const { loading, name } = this.props;

    return (
      <FeedContainer
        sortBy="blog"
        tag={name}
        userLoading={loading}
        header={<UserHeaderContainer name={name} />}
      />
    );
  }
}
