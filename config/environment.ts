import 'dotenv/config';

function requiredEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  baseURL: requiredEnv('BASE_URL', 'https://www.saucedemo.com'),
  apiBaseURL: requiredEnv('API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
  username: process.env.SAUCE_USERNAME ?? 'standard_user',
  password: process.env.SAUCE_PASSWORD ?? 'secret_sauce'
} as const;
