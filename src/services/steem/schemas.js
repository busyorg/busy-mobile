import { schema } from 'normalizr';

export const postSchema = new schema.Entity('posts');

export const postsSchema = [postSchema];
export const userSchema = new schema.Entity('users', {}, { idAttribute: 'name' });

export default null;
