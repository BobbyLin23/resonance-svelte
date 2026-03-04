import type { router } from '$lib/server/routers'
import type { InferRouterOutputs } from '@orpc/server'
import { getContext, setContext } from 'svelte'

type RouterOutputs = InferRouterOutputs<typeof router>
export type TTSVoiceItem =
  RouterOutputs['voices']['getAll']['custom'][number]

export interface TTSVoicesContextValue {
  customVoices: TTSVoiceItem[]
  systemVoices: TTSVoiceItem[]
  allVoices: TTSVoiceItem[]
}

const TTS_VOICES_KEY = Symbol('tts-voices') as symbol

export function setTTSVoicesContext(value: TTSVoicesContextValue): void {
  setContext(TTS_VOICES_KEY, value)
}

export function useTTSVoices(): TTSVoicesContextValue {
  const context = getContext<TTSVoicesContextValue>(TTS_VOICES_KEY)
  if (!context) {
    throw new Error('useTTSVoices must be used within a TTSVoicesProvider')
  }
  return context
}
