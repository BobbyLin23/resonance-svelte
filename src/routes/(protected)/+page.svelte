<script lang='ts'>
  import { OrganizationSwitcher, UserButton } from 'svelte-clerk'

</script>

<div class='flex min-h-screen flex-col items-center justify-center gap-4 bg-background'>
  <h1>Welcome to Resonance</h1>
  <div class='flex items-center gap-4'>
    <OrganizationSwitcher />
    <UserButton />
  </div>
</div>
