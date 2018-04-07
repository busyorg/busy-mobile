// @flox

import { connect } from 'react-redux';
import {
  getUserPostCount,
  getUserFollowerCount,
  getUserFollowingCount,
  getUserDisplayName,
  getUserAbout,
  getUserCover,
} from '../../reducers';
import { getUser } from '../actions';
import UserHeader from '../components/UserHeader';

const mapStateToProps = (state, { name }) => ({
  postCount: getUserPostCount(state, name),
  followerCount: getUserFollowerCount(state, name),
  followingCount: getUserFollowingCount(state, name),
  displayName: getUserDisplayName(state, name),
  about: getUserAbout(state, name),
  cover: getUserCover(state, name),
});

export default connect(mapStateToProps, { getUser })(UserHeader);
