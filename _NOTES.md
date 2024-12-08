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
in vite, it's VITE\_ (can be changed in config, property - envPrefix)
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

to get env in vite.config - use loadEnv

=========

deploy to github pages:
choose guthub actions
then static html
there is a yaml file (.yml)
add new steps there, after first step (name: Checkout)

- name: Setup Node
  uses: actions/setup-node@v3
  with:
  node-version: 18
  cache: 'npm'
- name: Install Dependencies
  run: npm install
- name: Build
  run: npm run build

and there is also:
with:
path: '.'

since script build creates folder with name dist, it needs different path
path: './dist'

this all will create a commit, and new folder .github/workflows/static.yml
and will start github action, like it was with playwrigth tests
every commit starts this workflow: set up node.js, npm install, npm build

!!!in vite.config it required to change base (url), because on github pages
the project is deployed at https://yarbest.github.io/vite-test/
vite-test is the name of the repo, but if in vite.config if says by default:
base: '/'
then url above is not correct, it would expect just: https://yarbest.github.io/
========

supports css modules out of box
and @import in style files
!!!for scss install: sass

in order to generate types for .module.scss, so when using in component
styles. - it would suggest class names
install typed-scss-modules package
!!!!or a better version, install plugin for vite
vite-plugin-sass-dts it will do it without running a separate script

========

tests:
https://codermo.medium.com/setting-up-a-react-app-with-vite-typescript-jest-and-react-testing-library-e001ddce4f53

install:
npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom

add scripts:
"test": "jest",
"test:watch": "jest --watch"

this will not work at first, it will complain, that there is no babel

install: npm install --save-dev ts-node jest-environment-jsdom

add jest.config.ts with:

export default {
preset: 'ts-jest',
testEnvironment: 'jest-environment-jsdom',
transform: {
'^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/**mocks**/fileMock.js',
'\\.(css|less)$': '<rootDir>/**mocks**/styleMock.js',
},
};

add setupTests.ts with:
import '@testing-library/jest-dom';

for static files (images etc) it needs mock, create file that is described in moduleNameMapper above with content:
export default 'test-file-stub';
--and same for styles: export default {};
--and for using alias import in tests, also add: '^@containers/(.\*)$': '<rootDir>/src/containers/$1',

change tsconfig: "include": ["src", "jest.config.ts", "setupTests.ts"] cause extension is .ts and it looks for ts files only in src

==========

!!!!! Eventually it will not work for integration test, cause Jest doesn't use ESMdules, like Vite and will throw error: but '--jsx' is not set.
SO USE VITEST

https://codingpr.com/test-your-react-app-with-vitest-and-react-testing-library/
there is also tests for router, context, user events

npm install -D vitest happy-dom @testing-library/react

so testEnvironment will be happy-dom, instead of jest-environment-jsdom like above

add to vite.config:
test: {
globals: true,
environment: 'happy-dom'
},
for correct type suggestions in this test property, use "as ViteUserConfig['test']" from vitest/config

change scripts in package.json
"test": "vitest",
"coverage": "vitest run --coverage"

install Vitest extension

also can use @testing-library/jest-dom and its functions like:
expect(element).toHaveTextContent(/react/i)
toBeInTheDocument
full list: https://www.npmjs.com/package/@testing-library/jest-dom

--in order not to import it in every file:
create setupTest.ts with:
import '@testing-library/jest-dom';

-- in vite.config add:
setupFiles: ['src/setupTest.ts'] in property "test"

So jest.config is not needed anymore
