<script lang='ts'>
  import type { Snippet } from 'svelte'
  import favicon from '$lib/assets/favicon.svg'
  import { Toaster } from '$lib/components/ui/sonner'
  import { ClerkProvider } from 'svelte-clerk'
  import './layout.css'

  const { children }: { children: Snippet } = $props()
</script>

<svelte:head><link rel='icon' href={favicon} /></svelte:head>
<Toaster />
<ClerkProvider>
  {@render children()}
</ClerkProvider>
