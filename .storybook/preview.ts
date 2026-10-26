import type { Preview } from '@storybook/react-vite';
import '@fontsource-variable/inter';
import '../src/app/styles/index.scss';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      options: {
        page: { name: 'Page', value: '#f9f9fd' },
        surface: { name: 'Surface', value: '#ffffff' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'page' },
  },
};

export default preview;
