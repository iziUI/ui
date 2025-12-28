import { defineTransformerPlugin } from '../defineTransformerPlugin';

export default defineTransformerPlugin(() => {
  return {
    name: 'css-custom',
    type: 'name',
    transform: ({ path }) => {
      return path.slice(1, path.length)
        .join('-');
    }
  };
});
