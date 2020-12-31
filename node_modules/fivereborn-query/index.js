const dgram = require('dgram')

function parseData(buffer) {
  const data = buffer.slice(18).toString('ascii').split('\\')
  const server = {}

  for (let i = 0; i < data.length; i += 2) {
    if (data[i] == 'sv_maxclients') {
      server['maxclients'] = Number(data[i + 1])
    }

    if (data[i] == 'clients') {
      server['clients'] = Number(data[i + 1])
    }

    if (data[i] == 'challenge') {
      server['challenge'] = data[i + 1]
    }

    if (data[i] == 'gamename') {
      server['gamename'] = data[i + 1]
    }

    if (data[i] == 'protocol') {
      server['protocol'] = Number(data[i + 1])
    }

    if (data[i] == 'hostname') {
      server['hostname'] = data[i + 1].replace(/\^[0-9]/g, '')
    }

    if (data[i] == 'gametype') {
      server['gametype'] = data[i + 1]
    }

    if (data[i] == 'mapname') {
      server['mapname'] = data[i + 1]
    }

    if (data[i] == 'iv') {
      server['iv'] = Number(data[i + 1])
    }
  }

  return server
}

function queryServer(ip, port, callback) {
  if (!ip || !port)
    callback(true)
  if (!callback)
    return

  const client = dgram.createSocket('udp4')
  const req = Buffer.from('\xFF\xFF\xFF\xFFgetinfo xxx', 'ascii')

  client.on('message', (message, remote) => {
    callback(false, parseData(message))
    client.close()
  })

  client.send(req, 0, req.length, port, ip, (err) => {
    if (err) {
      console.error(err)
      callback(true)
    }
  })
}

module.exports.query = queryServer
