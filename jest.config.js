module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.js',
        '**/*.jsx',
        '!**/node_modules/**',
        '!**/tests/**',
        '!**/*.config.js',
        '!**/gulpfile.js',
        '!**/dist/**',
        '!**/coverage/**'
    ]
};