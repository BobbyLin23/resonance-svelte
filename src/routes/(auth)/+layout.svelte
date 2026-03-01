<script lang='ts'>
  import type { Snippet } from 'svelte'

  const { children }: { children: Snippet } = $props()
</script>

<div class='flex min-h-screen items-center justify-center bg-background'>
  {@render children()}
</div>
