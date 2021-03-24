// .vitepress/theme/index.js
// import { defaultTheme } from 'vitepress'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import './variables.css'
import './styles.css'

DefaultTheme.enhanceApp = ({ app }) => {}

export default DefaultTheme