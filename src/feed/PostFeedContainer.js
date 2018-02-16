import { connect } from 'react-redux';
import _ from 'lodash';
import { getPostById } from '../ducks';
import PostFeed from '../components/PostFeed';

const mapStateToProps = (state, { id }) => {
  const post = getPostById(state, id);
  const { author, title, created, json_metadata: jsonMetadata } = post;

  const metadata = _.attempt(JSON.parse, jsonMetadata);

  let image = null;
  if (!_.isError(metadata)) {
    image = _.get(metadata, 'image[0]', null);
  }

  return { id, author, title, created, image };
};

export default connect(mapStateToProps)(PostFeed);
