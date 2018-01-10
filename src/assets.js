export async function getArrayBuffer(url) {
  const response = await fetch(url)
  return await response.arrayBuffer()
}
