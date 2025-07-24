import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
config({ path: '.env.local' });

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

// import type { Config } from 'drizzle-kit';
// export default <Config>{
//   schema: './drizzle/schema.ts',
//   out: './drizzle/migrations',
//   driver: 'pg',
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL ?? '',
//   },
// };
