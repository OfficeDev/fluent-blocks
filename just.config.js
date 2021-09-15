const path = require('path')
const child_process = require('child_process')
const awatch = require('awatch')
const { task, parallel } = require('just-scripts')

const storybook = require('@storybook/react/standalone')

task('watch-json', ()=>awatch('src/**/*.json', ()=>child_process.execSync('yarn build')))

task('storybook', ()=>{
  // This shouldn't be necessary but is needed due to strange logic in
  // storybook lib/core/src/server/config/utils.js
  process.env.NODE_ENV = "development";

  return async () => {
    await storybook({
      mode: "dev",
      configDir: path.join(process.cwd(), ".storybook"),
      port: 4000,
    });
  };
});

task('dev', parallel('storybook', 'watch-json'));
