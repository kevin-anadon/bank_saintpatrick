const PROD_URL = import.meta.env.VITE_SAINTPATRICKBANK_API_URL_PROD
const DEV_URL = import.meta.env.VITE_SAINTPATRICKBANK_API_URL_DEV

export const API_URL = (import.meta.env.DEV) ? DEV_URL : PROD_URL