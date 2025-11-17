import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import LMGFramework from './plugins/vite/lmg/LMGFramework';
export default defineConfig({ 
    resolve: {
        alias: {
            '@':  '/resources',
            'mixins': "/resources/sass/abstracts/mixins",
            'variables': "/resources/sass/abstracts/variables",
            'functions': "/resources/sass/abstracts/functions",
        },
    },
    plugins: [
        LMGFramework({
            output: {
                config  : '/resources/sass/framework/_config.scss',
                root    : '/resources/sass/framework/_root.scss',
            },
        }),
        laravel({
            input: [
                'resources/sass/site.scss',
                'resources/js/critical.ts',
            ],
            refresh: true,
        }),

    ],
});