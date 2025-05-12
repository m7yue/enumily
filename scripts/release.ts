#!/usr/bin/env zx

import { $ } from 'zx'

async function release() {
  const status = (await $`git status --porcelain`).toString().trim()
  if (status !== '') {
    console.error('There are uncommitted changes in the repository.')
    process.exit(1)
  }

  await $`pnpm changeset`

  await $`pnpm changeset version`

  await $`git add .`

  await $`git commit -m "chore: release a new version"`

  await $`git push --set-upstream origin master`
 
  console.log('release done!')
}

release()