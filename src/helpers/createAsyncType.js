const createAsyncActionType = type => ({
  ACTION: type,
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
});

export default createAsyncActionType;
