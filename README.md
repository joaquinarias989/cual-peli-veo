<div align="center">

<a href="https://cual-peli-veo.vercel.app/">
<img src="./public/banner.png" />
</a>

<p></p>

![GitHub stars](https://img.shields.io/github/stars/joaquinarias989/cual-peli-veo)
![GitHub issues](https://img.shields.io/github/issues/joaquinarias989/cual-peli-veo)

</div>

## 🛑 Advertisement

This application uses the artificial intelligence API of COHERE, it is paid, so the recommendation service does not work until an API KEY is entered.

## 👨‍🚀 Getting Started

> 🚧 You will need [Nodejs +16 (LTS recommended)](https://nodejs.org/en/) installed.

1. Fork this project:

- [Click here](https://github.com/joaquinarias989/cual-peli-veo/fork).

2. Clone the repository:

```bash
git clone git@github.com:YOU_USER/cual-peli-veo.git
```

3. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
# or
ultra install
```

4. Create a **.env** file with the following content:

```bash
## Cohere AI
PUBLIC_COHERE_API_KEY=
PUBLIC_COHERE_API_GENERATE_URL=https://api.cohere.ai/generate

## Movie DB API
PUBLIC_API_KEY=
PUBLIC_API_URI_SEARCH=https://api.themoviedb.org/3/search
PUBLIC_API_URI_IMGS=https://image.tmdb.org/t/p/w1280
```

### 🔑 How to get environment variables:

**COHERE:**

- [API KEYs](https://dashboard.cohere.ai/api-keys).

**THE MOVIE DB:**

- [API KEY Docs](https://www.themoviedb.org/documentation/api).

5. Ready 🥳

<p></p>

## 🎉 Deploy on Vercel

- ✅ [https://cual-peli-veo.vercel.app/](https://cual-peli-veo.vercel.app/).
