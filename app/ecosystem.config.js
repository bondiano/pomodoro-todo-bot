const isDev = process.env.NODE_ENV !== 'production';

const botServer = {
    'name': 'pomodoro-todo-bot',
    'exec_mode': 'cluster',
    'node_args': `${isDev ? '' : '-r ts-node/register '}-r tsconfig-paths/register`,
    'script': isDev ? './src/bin/bot.ts' : './dist/bin/bot.js',
    'env_development': {
        'watch': ['./src', './locales'],
        'NODE_ENV': 'development',
        'source_map_support': true
    },
    'env_production': {
        watch: false,
        'NODE_ENV': 'production'
    }
};

const config = {
    apps: [botServer]
};

module.exports = config;
