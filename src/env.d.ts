interface ImportMetaEnv {
  readonly SPREADSHEET_ID: string;
  readonly API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
