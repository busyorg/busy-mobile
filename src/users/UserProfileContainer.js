import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import {
  getUsersLoading,
  getUserPostCount,
  getUserFollowerCount,
  getUserFollowingCount,
  getUserDisplayName,
  getUserAbout,
} from '../ducks';
import { getUser } from '../ducks/users';

const mapStateToProps = (state, { name }) => ({
  loading: getUsersLoading(state),
  postCount: getUserPostCount(state, name),
  followerCount: getUserFollowerCount(state, name),
  followingCount: getUserFollowingCount(state, name),
  displayName: getUserDisplayName(state, name),
  about: getUserAbout(state, name),
});

export default connect(mapStateToProps, { getUser })(UserProfile);
