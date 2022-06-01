import {rm} from 'fs/promises'
import {
  task,
  parallel,
  series,
  tscTask,
} from "just-scripts";

task('rm:cjs', ()=>rm('cjs', {recursive: true, force: true}))
task('rm:esm', ()=>rm('esm', {recursive: true, force: true}))
task('rm:types', ()=>rm('types', {recursive: true, force: true}))
task("clean", parallel('rm:cjs', 'rm:esm', 'rm:types'));

task(
  "build:tsc",
  parallel(
    tscTask({
      project: 'tsconfig.build.json',
      module: "CommonJS",
      outDir: "cjs"
    }),
    tscTask({
      project: 'tsconfig.build.json',
      module: "ES2020",
      declarationDir: 'types',
      disableSizeLimit: true,
      declarationMap: true,
      declaration: true,
      outDir: "esm"
    })
  )
);

task("build", series("clean", "build:tsc"));
