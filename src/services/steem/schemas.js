import { schema } from 'normalizr';

const postSchema = new schema.Entity('posts');

export const postsSchema = [postSchema];

export default null;
