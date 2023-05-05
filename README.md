# Build

New build being tested on Aws amplify on domain https://app.zeke.ai

Staging is on https://develop.d2t73d5cswu388.amplifyapp.com/

# Build

Make sure we have the lastest LTS version of nodejs installed (v18 tested)

```
# install vercel cli
npm i -g vercel

# install yarn as package manager
npm i -g yarn

# install nextjs packages
yarn

# Complete Env Varibales - See Services section

## run dev enviroment
yarn dev
# or
vercel dev

## push to production
vercel --prod
```

# Services

Backend/Frontend Deployment (Nextjs)

- [Vercel](https://vercel.com/)
  - Env Varibales: None atm
  - Note: Pro Plan is advice to prevent function request timeout

NFT Minting Smart Contract

- [Third Web](https://thirdweb.com/)
  - Env Variable: `PRIVATE_KEY`, `COLLECTION_ADDRESS` # COLLECTION_ADDRESS = contract address
  - Goerli TestNet or Eth MainNet wallet is required
  - [Goerli TestNet Faucet](https://goerlifaucet.com/) for tokens

Image Generation (Stable Diffusion)

- [Banana Dev](https://www.banana.dev/)
  - Env Variable: `IMG_API_URL`, `IMG_API_KEY`, `IMG_MODEL_KEY`

ChatBot (OpenAI GPT3)

- [Open AI](https://openai.com/)
  - Env Variables: `CHAT_API_KEY`
