module.exports = {
	apps: [
		{
			name: 'au-api',
			script: 'server.js',
			ignore_watch: ['node_modules', '.idea', '.git'],
			watch: false,
			watch_options: {
				usePolling: 5000,
			},
			max_restarts: 10,
		},
	],
};
