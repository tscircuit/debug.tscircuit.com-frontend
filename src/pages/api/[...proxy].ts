import httpProxy from "http-proxy"

const API_URL = "https://debug.tscircuit.com"
const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default (req: any, res: any) => {
  return new Promise<void>((resolve, reject) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true }, (err: any) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}
