import React from 'react';
import PropTypes from 'prop-types';
import UserHeaderContainer from './UserHeaderContainer';
import FeedContainer from '../feed/FeedContainer';
import LoadingScreen from '../components/LoadingScreen';

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

    if (loading) return <LoadingScreen />;

    return <FeedContainer header={<UserHeaderContainer name={name} />} />;
  }
}
