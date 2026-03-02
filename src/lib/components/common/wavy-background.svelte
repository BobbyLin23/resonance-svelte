<script lang='ts'>
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils'
  import { createNoise3D } from 'simplex-noise'
  import { onDestroy, onMount } from 'svelte'

  interface Props {
    children?: Snippet
    className?: string
    containerClassName?: string
    colors?: string[]
    waveWidth?: number
    backgroundFill?: string
    blur?: number
    speed?: 'slow' | 'fast'
    waveOpacity?: number
    waveYOffset?: number
    [key: string]: any
  }

  const {
    children,
    className = '',
    containerClassName = '',
    colors,
    waveWidth,
    backgroundFill = 'black',
    blur = 10,
    speed = 'fast',
    waveOpacity = 0.5,
    waveYOffset = 250,
    ...props
  }: Props = $props()

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let w: number, h: number, nt: number, i: number, x: number
  let animationId: number
  let isSafari = $state(false)

  const noise = createNoise3D()

  const getSpeed = () => {
    switch (speed) {
      case 'slow':
        return 0.001
      case 'fast':
        return 0.002
      default:
        return 0.001
    }
  }

  const init = () => {
    ctx = canvas.getContext('2d')!
    w = ctx.canvas.width = window.innerWidth
    h = ctx.canvas.height = window.innerHeight
    ctx.filter = `blur(${blur}px)`
    nt = 0
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = window.innerHeight
      ctx.filter = `blur(${blur}px)`
    }
    // eslint-disable-next-line no-use-before-define
    render()
  }

  const waveColors = () => colors ?? [
    '#38bdf8',
    '#818cf8',
    '#c084fc',
    '#e879f9',
    '#22d3ee',
  ]

  const drawWave = (n: number) => {
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.lineWidth = waveWidth || 50
      ctx.strokeStyle = waveColors()[i % waveColors().length]
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100
        ctx.lineTo(x, y + waveYOffset)
      }
      ctx.stroke()
      ctx.closePath()
    }
  }

  const render = () => {
    ctx.fillStyle = backgroundFill || 'black'
    ctx.globalAlpha = waveOpacity || 0.5
    ctx.fillRect(0, 0, w, h)
    drawWave(5)
    animationId = requestAnimationFrame(render)
  }

  onMount(() => {
    init()
    isSafari = typeof window !== 'undefined'
      && navigator.userAgent.includes('Safari')
      && !navigator.userAgent.includes('Chrome')
  })

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      cancelAnimationFrame(animationId)
    }
  })
</script>

<div class={cn('h-screen flex flex-col items-center justify-center', containerClassName)}>
  <canvas
    bind:this={canvas}
    class='absolute inset-0 z-0'
    id='canvas'
    style:filter={isSafari ? `blur(${blur}px)` : undefined}
  ></canvas>
  <div class={cn('relative z-10', className)} {...props}>
    {@render children?.()}
  </div>
</div>
