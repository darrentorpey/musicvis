import axios from 'axios'

export async function getArrayBuffer(url) {
  const { data } = await axios({
    url,
    method: 'get',
    responseType: 'arraybuffer',
  })

  return data
}
