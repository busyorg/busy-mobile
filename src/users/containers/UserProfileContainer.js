import { connect } from 'react-redux';
import { getUsersLoading } from '../../reducers';
import { getUser } from '../actions';
import UserProfile from '../components/UserProfile';

export default connect(
  state => ({
    loading: getUsersLoading(state),
  }),
  { getUser },
)(UserProfile);
