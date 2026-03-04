import { deleteVoice, listVoices } from './voices'

export const router = {
  voices: {
    getAll: listVoices,
    delete: deleteVoice,
  },
}
