# FiveReborn Server query
##### Allows you to query FiveReborn servers easily.

## Installation:
`npm install fivereborn-query`

## Usage:

```javascript
const fivereborn = require('fivereborn-query')

fivereborn.query("255.255.255.255", 30120, (err, data) => {
  if (!err) {
    console.log(data)
  } else {
    console.log('Server is offline.')
  }
})
```

### Output:

```javascript
{ maxclients: 24,
  clients: 0,
  challenge: 'xxx',
  gamename: 'GTA5',
  protocol: 4,
  hostname: 'Test FiveReborn Server',
  gametype: 'Freeroam',
  mapname: 'fivem-map-skater',
  iv: -1688173451 }
```
