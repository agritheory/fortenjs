import { HooksConfig } from '@forten/hooks'
import { derived, IAction } from 'overmind'
import { LocaleConfig } from './types.js'

type Config = LocaleConfig & HooksConfig

export type Action<Input = void, Output = void> = IAction<Config, Input, Output>
export type AsyncAction<Input = void, Output = void> = IAction<
  Config,
  Input,
  Promise<Output>
>

export function derive<Value>(
  cb: (state: Config['state']['locale'], rootState: Config['state']) => Value
) {
  return derived(cb)
}
