<script lang='ts'>
  import type { Component } from 'svelte'
  import { page } from '$app/state'
  import logo from '$lib/assets/logo.svg'
  import { AudioLinesIcon, HeadphonesIcon, HomeIcon, LayoutGridIcon, SettingsIcon, Volume2Icon } from '@lucide/svelte'
  import { OrganizationSwitcher, useClerkContext, UserButton } from 'svelte-clerk'
  import * as Sidebar from '../ui/sidebar/index.js'
  import NavSection from './nav-section.svelte'

  interface MenuItem {
    title: string
    url?: string
    icon: Component
    onClick?: () => void
  }

  const context = useClerkContext()

  const mainMenuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      url: '/',
      icon: HomeIcon,
    },
    {
      title: 'Explore voices',
      url: '/voices',
      icon: LayoutGridIcon,
    },
    {
      title: 'Text to speech',
      url: '/text-to-speech',
      icon: AudioLinesIcon,
    },
    {
      title: 'Voice cloning',
      icon: Volume2Icon,
    },
  ]

  const othersMenuItems: MenuItem[] = [
    {
      title: 'Settings',
      icon: SettingsIcon,
      onClick: () => context.clerk?.openOrganizationProfile(),
    },
    {
      title: 'Help and support',
      url: 'mailto:business@codewithantonio.com',
      icon: HeadphonesIcon,
    },
  ]

  const pathname = $derived(page.url.pathname)
</script>

<Sidebar.Root collapsible='icon'>
  <Sidebar.Header class='flex flex-col gap-4 pt-4'>
    <div class='flex items-center gap-2 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0'>
      <img
        src={logo}
        alt='Resonance'
        width={24}
        height={24}
        class='rounded-sm'
      />
      <span class='group-data-[collapsible=icon]:hidden font-semibold text-lg tracking-tighter text-foreground'>
        Resonance
      </span>
      <Sidebar.Trigger class='ml-auto lg:hidden' />
    </div>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox:
                'w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!',
              organizationSwitcherTrigger:
                'w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]!',
              organizationPreview: 'gap-2!',
              organizationPreviewAvatarBox: 'size-6! rounded-sm!',
              organizationPreviewTextContainer:
                'text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!',
              organizationPreviewMainIdentifier: 'text-[13px]!',
              organizationSwitcherTriggerIcon:
                'size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!',
            },
          }} />
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <div class='border-b border-dashed border-border'></div>
  <Sidebar.Content>
    <NavSection items={mainMenuItems} pathname={pathname} />
    <NavSection
      label='Others'
      items={othersMenuItems}
      pathname={pathname}
    />
  </Sidebar.Content>
  <div class='border-b border-dashed border-border'></div>
  <Sidebar.Footer class='gap-3 py-3'>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox:
                'w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!',
              userButtonTrigger:
                'w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!',
              userButtonBox: 'flex-row-reverse! gap-2!',
              userButtonOuterIdentifier: 'text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!',
              userButtonAvatarBox: 'size-6!',
            },
          }} />
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
