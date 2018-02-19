import { connect } from 'react-redux';
import UserHeader from './UserHeader';
import {
  getUserPostCount,
  getUserFollowerCount,
  getUserFollowingCount,
  getUserDisplayName,
  getUserAbout,
} from '../ducks';
import { getUser } from '../ducks/users';

const mapStateToProps = (state, { name }) => ({
  postCount: getUserPostCount(state, name),
  followerCount: getUserFollowerCount(state, name),
  followingCount: getUserFollowingCount(state, name),
  displayName: getUserDisplayName(state, name),
  about: getUserAbout(state, name),
});

export default connect(mapStateToProps, { getUser })(UserHeader);
