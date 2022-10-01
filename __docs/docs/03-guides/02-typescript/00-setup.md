---
sidebar_position: 1
---

# Recommended setup

I've spent quite some time trying to set up the TypeScript bot based on Arcybot and got a few grey hairs in the process, so I decided to document the setup I've ended up with that actually worked.

### File structure

```md title="File structure"
main
| lib
| ├─ index.ts
| └─ commands
|      └── ...
└── tsconfig.json
└── package.json
```

### TSConfig

The `tsconfig.json` file I'm using is based on the recommended TSConfig base for the [strictest, ESM based Node 16 environment](https://github.com/tsconfig/bases/blob/main/bases/node16-strictest-esm.combined.json).

```json title="tsconfig.json"
{
  "compilerOptions": {
    "lib": ["es2021"],
    "target": "es2021",
    
    "baseUrl": "./lib",
    "module": "es2022",         /* Specify what module code is generated. */
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,

    "declaration": true,
    "declarationDir": "dist",
    "esModuleInterop": true,
    "sourceMap": true,
    "outDir": "dist",

    "strict": true,             /* Enable all strict type-checking options. */
    "skipLibCheck": true,       /* Skip type checking all .d.ts files. */
  },
  "include": ["lib/**/*"],
  "exclude": ["node_modules"],
}

```

### package.json

- [`tsc-alias`](https://www.npmjs.com/package/tsc-alias) to remove the headache of absolute module resolution
- [`tsx`](https://www.npmjs.com/package/tsx) 
- [`nodemon`](https://www.npmjs.com/package/nodemon)

```json title="package.json"
{
  // ...
  "type": "module",
  "engines": {
    "node": ">=16"
  },
  "files": [
    "dist/**/*"
  ],
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc --project tsconfig.json && tsc-alias -p tsconfig.json",
    "dev": "nodemon --exec npx tsx lib/index.ts",
    "start": "yarn build && node dist/index.js"
  },
  // ...
  "devDependencies": {
    "ts-node": "^10.9.1",
  }
}

```