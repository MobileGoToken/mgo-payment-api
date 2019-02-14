# MobileGo Payment API


#### Launch the app using Docker Compose:
It is possible to run development mode using docker compose, but you will need to have `.env` file at root of the project. When you create, to start application just run:
```
docker-compose up -d 
```

## FAQ:
If the there is a problem with communication between host and container and container-container check `DOCKER_NETWORK` and `DB_HOST` ip/port in .env. Run
```bash
ifconfig docker0 | grep inet
```
Get the ip address from inet and replace the provided ip address.

<hr>
# Production build

To run this application in production environment, prerequisities are:

* Node.JS v10.15.1
* PostgreSQL v9.6
* Ethereum Client


## Ethereum Client
  Running ethereum client is preferred on different server and using parity which can be installed on Ubuntu/Debian servers by running command: 
  ```
  $ bash <(curl https://get.parity.io -L)
  ```

  Ports needed for ethereum client are:

 Port | Protocol | Ip
---   | ---      | ---
30303 | TCP      | 0.0.0.0/0
30303 | UDP      | 0.0.0.0/0
30304 | UDP      | 0.0.0.0/0
8545  | TCP      | *this_app_ip/32*
8546  | TCP      | *this_app_ip/32*

An example of parity config file, by default can be found in `$HOME/.local/share/io.parity.ethereum/config.toml`:
```
[rpc]
interface = "0.0.0.0"
hosts = ["*"] // this app ip or dns (back-end part of the app)
cors = ["*"]
apis = ["web3", "eth", "pubsub", "net", "parity", "private", "parity_pubsub", "traces", "rpc", "shh", "shh_pubsub", "personal", "parity_accounts"]

[websockets]
interface = "0.0.0.0"
hosts = ["*"] // this app ip or dns (back-end part of the app)
apis = ["web3", "eth", "pubsub", "net", "parity", "private", "parity_pubsub", "traces", "rpc", "shh", "shh_pubsub", "personal", "parity_accounts"]

```


## This project build

Pull code from github:
```
git clone https://github.com/MobileGoToken/mgo-payment-api.git
```

Install dependencies:
```
cd mgo-payment-api && yarn install
```
Export environment variables or create `.env` file in root of the project, and it should look like this: 
```

NODE_ENV=development
NODE_PORT=3000

DB_HOST=127.0.01
DB_PORT=5432
DB_NAME=payment-api
DB_USER=admin
DB_PASS=strong-admin-password
DB_DEBUG=false

ETHEREUM_RPC=wss://domain.example.com:8546 // MUST BE WebSocket
TOKEN_ADDRESS=0x40395044Ac3c0C57051906dA938B54BD6557F212
TOKEN_DECIMALS=8

KEYFILE_PATH=/path/to/keyfile.json
KEYFILE_PASS=strong-password-for-keyfile

```

// TODO: Create start script for prod using pm2