<script lang='ts'>
  import { Button } from '../ui/button'
  import Spinner from '../ui/spinner/spinner.svelte'

  interface Props {
    size?: 'default' | 'sm'
    disabled: boolean
    isSubmitting: boolean
    class?: string
    onSubmit: () => void
  }

  const { size, disabled, isSubmitting, class: className, onSubmit }: Props = $props()
</script>

<Button
  size={size}
  disabled={disabled}
  class={className}
  onclick={onSubmit}
>
  {#if isSubmitting}
    <Spinner class='size-3' />
    Generating...
  {:else}
    Generate speech
  {/if}
</Button>
