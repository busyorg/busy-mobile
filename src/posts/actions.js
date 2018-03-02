import createAsyncType from '../helpers/createAsyncType';

export const GET_POST = createAsyncType('@posts/GET_POST');

export const VOTE_POST = createAsyncType('@posts/VOTE_POST');

export const getPost = (author, permlink, refresh = false) => ({
  type: GET_POST.REQUEST,
  meta: { author, permlink, refresh },
});

export const getPostSuccess = (payload, author, permlink, refresh = false) => ({
  type: GET_POST.SUCCESS,
  meta: { author, permlink, refresh },
  payload,
});

export const votePost = (postId, weight = 10000) => ({
  type: VOTE_POST.REQUEST,
  meta: {
    postId,
    weight,
  },
});
