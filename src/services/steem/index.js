import _ from 'lodash';
import { createClient } from 'lightrpc';
import { normalize } from 'normalizr';
import parsePost from '../../helpers/parsePost';
import { postsSchema, userSchema } from './schemas';

function Client() {
  this.client = createClient('https://api.steemit.com');
}

Client.prototype.sendAsync = function sendAsync(message, params) {
  return new Promise((resolve, reject) => {
    this.client.send(message, params, (err, result) => {
      if (err !== null) return reject(err);
      return resolve(result);
    });
  });
};

Client.prototype.getGlobal = async function getGlobal(sortBy) {
  let result = await this.sendAsync(`get_discussions_by_${sortBy}`, [{ limit: 10 }]);
  result = result.map(parsePost);
  return normalize(result, postsSchema);
};

Client.prototype.getMoreGlobal = async function getMoreGlobal(sortBy, startAuthor, startPermlink) {
  let result = await this.sendAsync(`get_discussions_by_${sortBy}`, [
    {
      limit: 11,
      start_author: startAuthor,
      start_permlink: startPermlink,
    },
  ]);
  result = result.slice(1).map(parsePost);
  return normalize(result, postsSchema);
};

Client.prototype.getTag = async function getTag(tag, sortBy) {
  let result = await this.sendAsync(`get_discussions_by_${sortBy}`, [{ tag, limit: 10 }]);
  result = result.map(parsePost);
  return normalize(result, postsSchema);
};

Client.prototype.getMoreTag = async function getMoreTag(tag, sortBy, startAuthor, startPermlink) {
  let result = await this.sendAsync(`get_discussions_by_${sortBy}`, [
    {
      tag,
      limit: 11,
      start_author: startAuthor,
      start_permlink: startPermlink,
    },
  ]);
  result = result.slice(1).map(parsePost);
  return normalize(result, postsSchema);
};

Client.prototype.getUser = async function getUser(username) {
  const [users, followCount] = await Promise.all([
    this.sendAsync('get_accounts', [[username]]),
    this.sendAsync('call', ['follow_api', 'get_follow_count', [username]]),
  ]);

  const user = users[0];
  const metadata = _.attempt(JSON.parse, user.json_metadata);
  user.json_metadata = !_.isError(metadata) ? metadata : {};
  user.follower_count = followCount.follower_count;
  user.following_count = followCount.following_count;

  return normalize(user, userSchema);
};

export default new Client();
