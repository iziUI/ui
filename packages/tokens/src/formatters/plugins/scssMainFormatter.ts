
import { defineFormatterPlugin } from '../defineFormatterPlugin';

export default defineFormatterPlugin(() => {
  return {
    name: 'scss/custom-main',
    format: () => {
      return `@forward "variables";
@forward "mixins";
`;
    }
  };
});
