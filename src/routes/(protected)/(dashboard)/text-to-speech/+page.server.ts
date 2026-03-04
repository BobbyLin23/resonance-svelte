export async function load({ url }) {
  const voiceId = url.searchParams.get('voiceId')
  const text = url.searchParams.get('text')

  return {
    title: 'Text to Speech',
    voiceId,
    text,
  }
}
