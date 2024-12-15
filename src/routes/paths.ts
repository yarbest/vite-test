export const paths = {
  todos: `${import.meta.env.PROD ? '/vite-test' : ''}/todos`,
  todo: `${import.meta.env.PROD ? '/vite-test' : ''}/todos:id`,
  notFound: `${import.meta.env.PROD ? '/vite-test' : ''}/not-found`,
}
