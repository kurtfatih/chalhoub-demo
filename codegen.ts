import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["lib/**/*.ts"],
  generates: {
    "./lib/apollo-client/__generated__/": {
      preset: "client",
      plugins: []
    }
  },
  ignoreNoDocuments: false
}

export default config
