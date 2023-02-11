import { RunOptions, RunTarget } from 'github-action-ts-run-api'
import assert from 'node:assert'

const target = RunTarget.jsFile('main.mjs', 'action.yml')

const options = RunOptions.create()
  .setInputs({
    token: 'noToken',
    workspace: 'packages',
    prefix: 'pkg:',
  })
  .setGithubContext({ payload: { pull_request: { number: 123 } } })
  .setGithubContext({ repository: 'owner/repo' })
  .setWorkspaceDir('tests')
  .setFakeFsOptions({ rmFakedTempDirAfterRun: false })

const result = await target.run(options)

try {
  assert(typeof result.error === 'undefined')
  assert(result.isSuccess === true)
  assert(result.durationMs >= 1000)
  assert(
    JSON.stringify(result.commands.outputs) ===
      JSON.stringify({ token: 'noToken', workspace: 'packages', prefix: 'pkg:', pullRequest: '123' })
  )
} finally {
  result.cleanUpFakedDirs()
}
