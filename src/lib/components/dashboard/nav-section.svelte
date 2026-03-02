<script lang='ts'>
  import type { Component } from 'svelte'
  import * as Sidebar from '../ui/sidebar/index.js'

  interface MenuItem {
    title: string
    url?: string
    icon: Component
    onClick?: () => void
  }

  interface NavSectionProps {
    label?: string
    items: MenuItem[]
    pathname: string
  }

  const { label, items, pathname }: NavSectionProps = $props()
</script>

<Sidebar.Group>
  {#if label}
    <Sidebar.GroupLabel class='text-[13px] uppercase text-muted-foreground'>
      {label}
    </Sidebar.GroupLabel>
  {/if}
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each items as item, _i (item.title)}
        {@const IconComp = item.icon}
        <Sidebar.MenuItem>
          {#if item.url}
            {#snippet linkChild({ props }: { props: Record<string, unknown> })}
              <a href={item.url} {...props}>
                <IconComp />
                <span>{item.title}</span>
              </a>
            {/snippet}
            <Sidebar.MenuButton
              isActive={item.url === '/'
                ? pathname === '/'
                : pathname.startsWith(item.url)}
              tooltipContent={item.title}
              class='h-9 px-3 py-2 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:border-border data-[active=true]:shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03),inset_0px_0px_0px_2px_white]'
              child={linkChild}
            />
          {:else}
            <Sidebar.MenuButton
              isActive={false}
              tooltipContent={item.title}
              onclick={item.onClick}
              class='h-9 px-3 py-2 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:border-border data-[active=true]:shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03),inset_0px_0px_0px_2px_white]'
            >
              <IconComp />
              <span>{item.title}</span>
            </Sidebar.MenuButton>
          {/if}
        </Sidebar.MenuItem>
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>
