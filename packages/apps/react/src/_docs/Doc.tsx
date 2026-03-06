import { Source } from '@storybook/blocks';

import Stack from '@/components/Stack';
import Typography from '@/components/Typography';

interface DocProps {
  path: string;
  title: string;
  description: string;
  context: any;
}

export default function Doc({
  path,
  title,
  description,
}: DocProps) {
  const name = path.split('/').reverse()[0];
  const code = `import ${name} from '@iziui/react/${name};'`;

  return (
    <Stack>
      <Typography variant="h3">
        {title}
      </Typography>
      <Typography>
        {description}
      </Typography>
      <Typography variant="subtitle1">
        Import
      </Typography>
      <Source code={code} language="tsx" />
    </Stack>
  );
}