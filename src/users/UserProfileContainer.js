import { connect } from 'react-redux';
import { getUsersLoading } from '../ducks';
import { getUser } from '../ducks/users';
import UserProfile from './UserProfile';

export default connect(
  state => ({
    loading: getUsersLoading(state),
  }),
  { getUser },
)(UserProfile);
