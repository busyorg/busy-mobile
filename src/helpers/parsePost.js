// @flow

import _ from 'lodash';
import Remarkable from 'remarkable';
import striptags from 'striptags';
import { calculatePayout } from '../helpers/steemitHelpers';

import type { Post } from '../types';

const md = new Remarkable({
  html: true, // remarkable renders first then sanitize runs...
  breaks: true,
  linkify: false, // linkify is done locally
  typographer: false, // https://github.com/jonschlinkert/remarkable/issues/142#issuecomment-221546793
  quotes: '“”‘’',
});

export default function parsePost(post: Object): Post {
  const newPost = {};

  let metadata = _.attempt(JSON.parse, post.json_metadata);
  if (_.isError(metadata)) metadata = {};
  newPost.metadata = metadata;

  newPost.id = post.id;
  newPost.title = post.title;
  newPost.body = post.body;
  newPost.author = post.author;
  newPost.permlink = post.permlink;
  newPost.created = post.created;
  newPost.category = post.category;
  newPost.depth = post.depth;
  newPost.tags = _.union(_.get(newPost.metadata, 'tags', []), [post.category]);

  newPost.htmlBody = md.render(post.body);
  newPost.excerpt = _.unescape(striptags(newPost.htmlBody).replace(/\n/g, ' '))
    .slice(0, 200)
    .trim();

  const upvotes = post.active_votes.filter(vote => vote.percent > 0);

  newPost.commentCount = post.children;
  newPost.upvoteCount = upvotes.length;
  newPost.flagCount = newPost.upvoteCount - post.active_votes.length;
  newPost.upvoters = upvotes.map(vote => vote.voter);

  const payout = calculatePayout(post);

  newPost.payout = payout.cashoutInTime ? payout.potentialPayout : payout.pastPayouts;

  return newPost;
}
