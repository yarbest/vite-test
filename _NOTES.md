npm create vite
(choose React, TS+SWC)

cd vite-test-project
npm i (install modules)
npm run dev

VITE vs CRA(Webpack) during development, Webpack creates a whole bundle, like for building for prod
which takes time during development, VITE uses js modules, so during development there is no big bundle, like it is when we build project for prod

---

if ts file shows error:
npm install --save-dev @types/estree @types/json-schema @types/prop-types
!!!!or just reopen window, it might go

Do recommended eslint settings from README:
adding languageOptions, replacing tseslint.configs.recommended, add plugin
eslint-plugin-react and its rules

But even after this setting, importing non existing images, or other non-ts file
will NOT show error, untill running project
Needs to install this, so if trying to import non existing file, it would show error in IDE
eslint-plugin-import
add it to eslint.config.js:
rules: 'import/no-unresolved': 'error',
plugins: import: importPlugin,
syntax of rules:
'rule_name': 0=(off) 1=(warn) 2=(error)
'rule_name': ['error', {optionForSpecificRule: true}]

But importing files from public directory like this, will fail because of this plugin:
import viteLogo from '/vite.svg';
It needs package: eslint-import-resolver-alias
Change config:
settings: {
'import/resolver': {
alias: {
map: [['', './public']],
// can be empty
extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
},
},
},

Restart IDE, so it just changes / to ./public for selected extensions (or restart eslint server, or use extension for restarting)
!! This would also allow to use alias like @containers so import doesn't have long name
['@containers', 'src/containers'],
!!!!!|BUT it would just stop linter from complaining, the real alias, that allows to import
is located in tsconfig.json (jsconfig.json)
"baseUrl": ".",
"paths": {
"@containers/_": ["src/containers/_"]
},

In order to remove extensions at the end of import
import { func } from './containers/a';
so it doesn't give error, inside import/resolver it needs:
node: {
extensions: ['.js', '.jsx', '.ts', '.tsx'],
},
!!BUT also update vite.config, to have alias:
resolve: {
alias: {
'@containers': path.resolve(\_\_dirname, 'src/containers'),
},
},
for that install path, @types/node

==========

getting env, regularly it's process.env.MY*ENV
in CRA, it has to have prefix REACT_APP*
in vite, it's VITE\_
but receiving is different - import.meta.env.VITE_TEST
it also has such variables as: DEV: true, PROD: false, SSR: false
PROD: true, when using preview, it runs server in PROD mode
but first it needs to be built, by script: build

file .env.local doesn't get to git, but .env does
.env.production(.local) won't be visible during running dev server
.env.development(.local) will be

so .local doesn't get to git
.production is not accessible in dev mode

if these files has the same key, .env has lower priority

=========

supports css modules out of box
and @import in style files
!!!for scss install: sass
