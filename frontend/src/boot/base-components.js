import * as BaseComponents from 'components/BaseComponents'

export default async ({ Vue }) => {
  // Globally register your base components
  // so you don't have to import them in your files, care of name clash
  // check 'components/BaseComponents/index.js' where these component files
  // are exported
  Object.keys(BaseComponents).forEach(v => {
    Vue.component(v, BaseComponents[v])
  })
}
