// @flow

import type { AsyncType } from '../types';

const createAsyncType = (type: string): AsyncType => ({
  ACTION: type,
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
});

export default createAsyncType;
