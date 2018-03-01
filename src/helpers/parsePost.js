import _ from 'lodash';
import { calculatePayout } from '../helpers/steemitHelpers';

export default function parsePost(post) {
  const newPost = {};

  newPost.id = post.id;
  newPost.title = post.title;
  newPost.body = post.body;
  newPost.author = post.author;
  newPost.permlink = post.permlink;
  newPost.created = post.created;
  newPost.category = post.category;

  let metadata = _.attempt(JSON.parse, post.json_metadata);
  if (_.isError(metadata)) metadata = {};
  newPost.metadata = metadata;

  const upvotes = post.active_votes.filter(vote => vote.percent >= 0);

  newPost.commentCount = post.children;
  newPost.upvoteCount = upvotes.length;
  newPost.flagCount = newPost.upvoteCount - post.active_votes.length;
  newPost.upvoters = upvotes.map(vote => vote.voter);

  const payout = calculatePayout(post);

  newPost.payout = payout.cashoutInTime ? payout.potentialPayout : payout.pastPayouts;

  return newPost;
}
