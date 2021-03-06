import { build, settings } from '@forten/build'
import { locale, LocaleSettings } from '@forten/locale'
import { TStories } from '@forten/story'
import { theme } from '@forten/theme'
import { IAction, Overmind } from 'overmind'
import { createHook } from 'overmind-react'
import { styled, StyledSettings } from '../../index.js'
import * as actions from './actions/index.js'
import { family } from './family.js'
import { icons } from './icons.js'
import { inspector } from './inspector.js'

const test = {
  name: 'test',
  settings: settings<StyledSettings & LocaleSettings>({
    styled: {
      icons,
      family,
      inspector,
    },
    locale: {
      ru: {
        Hello: 'привет',
      },
      en: {
        adminCheckbox: 'admin',
        usernamePlaceholder: 'Your username',
        userTip: 'This is the user tip',
        enterUsername: 'Enter your username',
        passwordPlaceholder: 'Password',
        Close: 'Close',
        DearFriend: 'Dear FRIEND, I love you.',
        Validate: "Let's go!",
        Welcome: 'Welcome to styled !',
        InvalidUsernameOrPassword: 'Invalid username or password.',
        Loading: 'App is loading...',
        PleaseLogin: 'Please enter your credentials...',
        Login: 'Login',
        LoginTitle: 'Login to yourself',
        Cancel: 'Cancel',
        TooManyEmotions: 'Too many emotions !',
        Hello: 'Hello World!',
        ru: 'Russian',
        fr: 'French',
        hin: 'Hindi',
      },
      // Just to have more than one lang for LangSelector display.
      fr: {
        Hello: 'Bonjour',
      },
      common: {
        en: 'English',
        fr: 'Français',
        de: 'Deutsche',
      },
    },
  }),

  state: {
    login: {
      error: 'InvalidUsernameOrPassword',
      admin: false,
      username: '',
    },
    test: {
      open: false,
      lang: 'fr',
      hasDocument: true,
    },
  },
  actions,
}

export const config = build(test)
  .using(locale) // uses preferences
  .using(styled)
  .using(theme)
  .config()

export const config2 = build({
  name: 'test2',
  settings:
    // for coverage
    { styled: {} },
})
  .using(locale)
  .using(styled)
  .using(theme)
  .config() as typeof config // cheating to have empty iconProvider.

export type TestConfig = typeof config
export type TestApp = Overmind<TestConfig>
export type Stories<Props = any> = TStories<typeof config, Props>
export type Action<Input = void, Output = void> = IAction<
  TestConfig,
  Input,
  Output
>
export const useOvermind = createHook<TestConfig>()
