module.exports = {
  git: {
    commitMessage: 'chore: release v${version}',
    requireBranch: 'master',
    tagName: 'v${version}',
  },
  npm: {
    publish: true,
    skipChecks: true,
  },
  github: {
    release: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
};
