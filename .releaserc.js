module.exports = {
  branches: [
    'master',
    'next',
    'next-major',
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'alpha',
      prerelease: true
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'audit-trades-linux', label: 'Linux binary' },
          { path: 'audit-trades-macos', label: 'Macos binary' },
          { path: 'audit-trades-win.exe', label: 'Windows binary' }
        ]
      }
    ],
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md', changelogTitle: '# Changelog' }],
    ['@semantic-release/git', { assets: ['CHANGELOG.md'] }]
  ]
};
