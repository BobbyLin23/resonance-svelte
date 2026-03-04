import { glass } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'

export function getVoiceAvatarDataUri(seed: string): string {
  return createAvatar(glass, {
    seed,
    size: 128,
  }).toDataUri()
}
