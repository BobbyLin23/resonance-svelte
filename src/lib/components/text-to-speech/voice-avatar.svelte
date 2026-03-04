<script lang='ts'>
  import * as Avatar from '$lib/components/ui/avatar'
  import { cn } from '$lib/utils'
  import { getVoiceAvatarDataUri } from './voice-avatar-utils'

  interface Props {
    seed: string
    name: string
    class?: string
  }

  const { seed, name, class: className }: Props = $props()

  const avatarUrl = $derived(getVoiceAvatarDataUri(seed))
</script>

<Avatar.Root class={cn('size-4 border-white shadow-xs', className)}>
  <Avatar.Image src={avatarUrl} alt={name} />
  <Avatar.Fallback class='text-[8px]'>
    {name.slice(0, 2).toUpperCase()}
  </Avatar.Fallback>
</Avatar.Root>
