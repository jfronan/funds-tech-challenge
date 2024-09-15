module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	testPathIgnorePatterns: [
		'/public/',
		'/challenge_docs/',
		'/node_modules/'
	],
    transform: {
      'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest'
    },
    transformIgnorePatterns: [
      'node_modules/(?!variables/.*)'
    ]

}