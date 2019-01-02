const isDev = process.env.NODE_ENV !== 'production';

const botServer = {
    'name': 'API',
    'script': './src/index.ts',
    'node_args': `${isDev ? '' : '-r ts-node/register '}-r tsconfig-paths/register`,
    'exec_mode': 'cluster',
    'watch': ['./src'],
    'env_development': {
        'NODE_ENV': 'development',
        'source_map_support': true
    },
    env_stage: {
        NODE_ENV: 'stage'
    },
    'env_production': {
        'NODE_ENV': 'production'
    }
};

const config = {
    apps: [botServer]
};

module.exports = config;
