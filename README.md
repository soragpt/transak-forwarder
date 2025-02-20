# Transak Forwarder

A simple router that, given a silo engine account ID and wallet address,
generates an associated [Forwarder](https://github.com/aurora-is-near/near-forwarder-indexer)
address then redirects to [Transak](https://transak.com/).

## Usage

In production this service is deployed at:

```text
https://transak.auroracloud.dev
```

To use it we need to hit that URL with the following query parameters:

| Query parameter | Description |
|-----------------|-------------|
| `apiKey`        | An API key for Transak. |
| `silo`          | The engine account ID of a silo (e.g. `0x4e45415d.c.aurora`). |
| `walletAddress` | The customer's wallet address. |

So, a full URL would look something like:

```text
https://transak.auroracloud.dev?apiKey=mykey&silo=0x4e45415d.c.aurora&walletAddress=0x123
```

## Local setup

Install dependencies using [yarn](https://classic.yarnpkg.com/):

```text
yarn install
```

Create a local environment variables file:

```text
cp .env.local.template .env.local
```

Fill in the `FORWARDER_API_KEY`, then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
