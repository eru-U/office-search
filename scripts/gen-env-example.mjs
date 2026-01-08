// scripts/gen-env-example.mjs
import fs from "node:fs";

export const generateEnvExample = () => {
  try {
    const envContent = fs.readFileSync(".env.local", "utf8");
    const exampleContent = envContent.replace(/=.*/g, "=");
    fs.writeFileSync(".env.example", exampleContent);
    console.log("✅ .env.example has been generated!");
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Failed to generate .env.example:", err.message);
    }
  }
};

generateEnvExample();
