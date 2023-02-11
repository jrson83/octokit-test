import * as core from '@actions/core'
import * as github from '@actions/github'
/* import { Octokit } from '@octokit/rest'
import multimatch from 'multimatch' */

export async function actionMainFn() {
  const token = core.getInput('token', { required: true, trimWhitespace: true }) || process.env.GITHUB_TOKEN

  if (!token) {
    core.error('failed to provide a GitHub token for accessing the GitHub REST API.')
  }

  core.setOutput('token', token)

  const workspace = core.getInput('workspace', { required: true })

  core.setOutput('workspace', workspace)

  const prefix = core.getInput('prefix', { required: false })

  core.setOutput('prefix', prefix)

  const pullRequest = github?.context?.payload?.pull_request?.number.toString()

  if (!pullRequest) {
    core.error('could not find pull request number')
    core.setFailed('could not find pull request number')
    return
  }

  core.setOutput('pullRequest', pullRequest)

  /* const client = new Octokit({
    auth: token,
  })

  core.debug(`fetching changed files for pr #${pullRequest}`)

  const changedFiles = await getChangedFiles(client, pullRequest)
  console.log(changedFiles) */

  return /** @type {Promise<void>} */ (
    new Promise((resolve) =>
      setTimeout(() => {
        /* core.setFailed('err1') */
        resolve()
      }, 1000)
    )
  )
}

actionMainFn()

async function getChangedFiles(client, prNumber) {
  const listFilesResponse = await client.pulls.listFiles({
    owner: github.context.repo.owner || process.env.GITHUB_TOKEN,
    repo: github.context.repo.repo,
    pull_number: prNumber,
  })

  const changedFiles = listFilesResponse.data.map((f) => f.filename)

  core.debug('found changed files:')
  for (const file of changedFiles) {
    core.debug(`  ${file}`)
  }

  return changedFiles
}

async function addLabels(client, prNumber, labels) {
  core.debug(`labels to add: ${labels}`)

  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    labels: labels,
  })
}
