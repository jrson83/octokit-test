import * as core from '@actions/core'
import * as github from '@actions/github'

// @ts-ignore
const octokit = github.getOctokit(process.env.GITHUB_TOKEN, { baseUrl: process.env.GITHUB_API_URL })

octokit.rest.repos
  .get({
    repo: 'r',
    owner: 'o',
  })
  .then((resp) => {
    core.setOutput('resp', resp.data)
  })
