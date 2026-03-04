<script lang='ts'>
  import type { Snippet } from 'svelte'
  import type { TTSVoicesContextValue } from './tts-voices-context.svelte'
  import { setTTSVoicesContext } from './tts-voices-context.svelte'

  interface Props {
    value: TTSVoicesContextValue
    children?: Snippet
  }

  const { value, children }: Props = $props()

  // svelte-ignore state_referenced_locally
  setTTSVoicesContext(value)
</script>

{@render children?.()}
