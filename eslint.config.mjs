import pluginCypress from 'eslint-plugin-cypress';

const recommendedConfig = pluginCypress.configs.recommended;
const cypressGlobals = recommendedConfig.languageOptions?.globals || {};

export default [
    {
        languageOptions: {
            globals: {
                ...cypressGlobals,
            },
        },
        plugins: {
            cypress: pluginCypress,
        },
        rules: {
            ...recommendedConfig.rules,
            'cypress/no-assigning-return-values': 'error',
            'cypress/no-unnecessary-waiting': 'error',
            'cypress/assertion-before-screenshot': 'warn',
            'cypress/no-force': 'warn',
            'cypress/no-async-tests': 'error',
            'cypress/no-pause': 'error',
            'quotes': ['error', 'single']
        },
    },
];