export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Facets',
        'Views',
        'Surfaces',
        'Blocks',
        'Media',
        '*',
      ],
    },
  },
  viewMode: 'docs',
}

document.addEventListener('keyup', (e) => {
  if (e.key === '`') {
    document.body.classList.toggle('debug-css')
  }
})
