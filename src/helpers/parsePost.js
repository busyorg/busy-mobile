import _ from 'lodash';

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

  newPost.commentCount = post.children;
  newPost.upvoteCount = post.active_votes.filter(vote => vote.percent >= 0).length;
  newPost.flagCount = newPost.upvoteCount - post.active_votes.length;

  return newPost;
}
