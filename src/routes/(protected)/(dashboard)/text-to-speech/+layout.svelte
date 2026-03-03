<script lang='ts'>
  import PageHeader from '$lib/components/common/page-header.svelte'

  const { children } = $props()
</script>

<div class='flex h-full min-h-0 flex-col overflow-hidden'>
  <PageHeader title='Text Input' />
  {@render children()}
</div>
