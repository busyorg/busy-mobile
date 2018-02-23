import { schema } from 'normalizr';

const postSchema = new schema.Entity('posts');

export const postsSchema = [postSchema];
export const userSchema = new schema.Entity('users', {}, { idAttribute: 'name' });

export default null;
