const createAsyncActionType = type => ({
  ACTION: type,
  REQUEST: `${type}_REQUEST`,
  START: `${type}_START`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
});

export default createAsyncActionType;
