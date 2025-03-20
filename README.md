<img src="https://og.sznm.dev/api/generate?heading=vite-react-tailwind-starter&text=React+vite+template+with+TailwindCSS+and+TypeScript+setup.&template=color&center=true&height=330" />

This is a project bootstrapped with [`@vitejs/app`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) (`react-ts`), added with [TailwindCSS](https://tailwindcss.com) and [TypeScript](https://www.typescriptlang.org) setup.

- ⚡ blazing fast dev server and build
- 🔗 route management added (`react-router` v7 - Framework configuration - SPA mode)

## Getting Started


```bash
git clone https://github.com/fK470/fe-todo-app-sandbox
```

```
pnpm install
```

Then, run the development server:

```bash
# You haven't prepared API. Then run json-server.
# Make sure the port in 'api/config.ts' is 3000.
pnpm json-server

# Open anoter terminal and run app dev server.
pnpm dev
```

## Deployment

- build command: `pnpm build`
- output directory: `build/client`

## References

- [vite](https://vitejs.dev)
  - [avoid manual import](https://vitejs.dev/guide/features.html#jsx)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org)
