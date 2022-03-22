import {rm} from 'fs/promises'
import {
  task,
  parallel,
  series,
  tscTask,
} from "just-scripts";

task('rm:cjs', ()=>rm('cjs', {recursive: true, force: true}))
task('rm:esm', ()=>rm('esm', {recursive: true, force: true}))
task("clean", parallel('rm:cjs', 'rm:esm'));

task(
  "build:tsc",
  parallel(
    tscTask({
      module: "CommonJS",
      outDir: "cjs"
    }),
    tscTask({
      module: "ES2020",
      outDir: "esm"
    })
  )
);

task("build", series("clean", "build:tsc"));
