export const paths = {
  root: `${import.meta.env.PROD ? '/vite-test' : ''}/`,
  todos: `${import.meta.env.PROD ? '/vite-test' : ''}/todos`,
  todo: `${import.meta.env.PROD ? '/vite-test' : ''}/todos/:id`,
  notFound: `${import.meta.env.PROD ? '/vite-test' : ''}/not-found`,
  login: `${import.meta.env.PROD ? '/vite-test' : ''}/login`,
}
