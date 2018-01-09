module.exports = {
  allowBreakingChanges: ['feat'],
  allowCustomScopes: false,
  scopes: [
    'animations',
    'core',
    'utils'
  ],
  types: [
    {value: 'feat',     name: 'feat:     A new feature'},
    {value: 'fix',      name: 'fix:      A bug fix'},
    {value: 'docs',     name: 'docs:     Documentation only changes'},
    {value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature'},
    {value: 'test',     name: 'test:     Adding missing tests'},
    {value: 'chore',    name: 'chore:    Changes to the build process or auxiliary tools and libraries such as documentation generation'},
    {value: 'revert',   name: 'revert:   Revert to a commit'}
  ]
};
