import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import { getUsersLoading, getUserDisplayName, getUserAbout } from '../ducks';
import { getUser } from '../ducks/users';

const mapStateToProps = (state, { name }) => ({
  loading: getUsersLoading(state),
  displayName: getUserDisplayName(state, name),
  about: getUserAbout(state, name),
});

export default connect(mapStateToProps, { getUser })(UserProfile);
