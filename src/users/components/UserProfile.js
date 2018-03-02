import React from 'react';
import PropTypes from 'prop-types';
import UserHeaderContainer from '../containers/UserHeaderContainer';
import FeedContainer from '../../feed/containers/FeedContainer';

export default class UserProfile extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    getUser: PropTypes.func,
  };

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
