/** @type { import('@storybook/react').Preview } */
import "../src/styles/global.css"; // Ensure this path is correct
import "../src/index.css"; // If using index.css for Tailwind

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
