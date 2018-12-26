# storybook-link-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that comments PRs with a link to storybook when deployed by CI.

## Demo

See https://github.com/benjlevesque/storybook-link-bot-demo/ and open a PR.

## Usage

### Install

Install to your repo using https://github.com/apps/storybook-link-bot

### Configuration

| setting          | description                                                                                              | default                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| body             | the body that will be sent in the comment (`{url}` will be replaced by the storybook url)                | `Browse storybook for this branch at {url}`                     |
| checkName        | the GitHub check that needs to go green for the URL to be posted, typically the storybook deploy CI task | `deploy-storybook`                                              |
| storybookUrlBase | the base URL for storybook                                                                               | `https://s3-eu-west-1.amazonaws.com/storybook.request.network/` |
| projectName      | the Project Name that will be appended to the `storybookUrlBase`                                         | Github repository name                                          |

> **Note**
>
> The URL will be composed as follows:
>
> `storybookUrlBase + projectName + "/" + branchName + "/index.html"`

#### Overrides

You can override some or all above settings by creating a `storybook.yml` file under a `.github` repository in your repo.

## Run locally

```sh
yarn
yarn build
yarn start
```
