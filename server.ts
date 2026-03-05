import express from "express";
import { createServer as createViteServer } from "vite";
import AdmZip from "adm-zip";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import sharp from "sharp";
import slugify from "slugify";
import { initDb } from "./src/lib/db";
import db from "./src/lib/db";
import dotenv from "dotenv";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM("").window;
const dompurify = createDOMPurify(window as any);

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "linos-security-secret-2026";
const PORT = 3000;

async function startServer() {
  initDb();
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: "Forbidden" });
      req.user = user;
      next();
    });
  };

  // Auth Routes
  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (user && bcrypt.compareSync(password, user.password_hash)) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" });
      res.cookie("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 24 hours
        sameSite: "strict",
      });
      res.json({ success: true, user: { username: user.username } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ success: true });
  });

  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Blog API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
    res.json(posts);
  });

  app.get("/api/posts/:slug", (req, res) => {
    const post = db.prepare("SELECT * FROM posts WHERE slug = ?").get(req.params.slug);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  });

  app.post("/api/posts", authenticateToken, (req, res) => {
    const post = req.body;
    const slug = post.slug || slugify(post.title, { lower: true, strict: true });

    const content = dompurify.sanitize(post.content || "");
    try {
      const result = db.prepare(`
        INSERT INTO posts (
          title, slug, content, excerpt, featured_image, category, tags, author, 
          publish_date, status, meta_title, meta_description, focus_keyword, 
          canonical_url, robots_index, og_title, og_description, og_image, 
          twitter_card, schema_json, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).run(
        post.title, slug, content, post.excerpt, post.featured_image, post.category,
        post.tags, post.author, post.publish_date, post.status || 'draft',
        post.meta_title, post.meta_description, post.focus_keyword, post.canonical_url,
        post.robots_index ? 1 : 0, post.og_title, post.og_description, post.og_image,
        post.twitter_card, post.schema_json
      );
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/posts/:id", authenticateToken, (req, res) => {
    const post = req.body;
    const id = req.params.id;

    const content = dompurify.sanitize(post.content || "");
    try {
      db.prepare(`
        UPDATE posts SET 
          title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, category = ?, 
          tags = ?, author = ?, publish_date = ?, status = ?, meta_title = ?, 
          meta_description = ?, focus_keyword = ?, canonical_url = ?, robots_index = ?, 
          og_title = ?, og_description = ?, og_image = ?, twitter_card = ?, 
          schema_json = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        post.title, post.slug, content, post.excerpt, post.featured_image, post.category,
        post.tags, post.author, post.publish_date, post.status,
        post.meta_title, post.meta_description, post.focus_keyword, post.canonical_url,
        post.robots_index ? 1 : 0, post.og_title, post.og_description, post.og_image,
        post.twitter_card, post.schema_json, id
      );
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/posts/:id", authenticateToken, (req, res) => {
    db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Image Upload System
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/blog");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage });

  app.post("/api/upload", authenticateToken, upload.single("image"), async (req: any, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    const fileName = path.parse(req.file.filename).name + ".webp";
    const outPath = path.join("public/uploads/blog", fileName);

    try {
      await sharp(filePath)
        .webp({ quality: 80 })
        .resize(1200, null, { withoutEnlargement: true })
        .toFile(outPath);

      // Remove original file
      fs.unlinkSync(filePath);

      res.json({ url: `/uploads/blog/${fileName}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // AI SEO Optimization
  app.post("/api/ai/optimize", authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are an SEO expert for a luxury security company in Abuja, Nigeria called Linos E’ Security. 
      Analyze this blog post title: "${title}".
      Suggest a highly optimized Meta Title (max 60 chars) and Meta Description (max 160 chars) that includes local Abuja keywords.
      Return the result as a raw JSON object with keys: "meta_title" and "meta_description". Do not include markdown formatting.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim().replace(/```json|```/g, '');
      res.json(JSON.parse(text));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Site Settings API
  app.get("/api/settings", authenticateToken, (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  });

  app.post("/api/settings", authenticateToken, (req, res) => {
    const settings = req.body;
    const stmt = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");

    db.transaction(() => {
      for (const [key, value] of Object.entries(settings)) {
        stmt.run(key, typeof value === 'string' ? value : JSON.stringify(value));
      }
    })();

    res.json({ success: true });
  });

  // SEO: Sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    const posts: any = db.prepare("SELECT slug, updated_at FROM posts WHERE status = 'published'").all();
    const categories: any = db.prepare("SELECT DISTINCT category FROM posts WHERE status = 'published'").all();
    const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${appUrl}/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>${appUrl}/blog</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>`;

    posts.forEach((post: any) => {
      sitemap += `
  <url>
    <loc>${appUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
    <changefreq>weekly</changefreq>
  </url>`;
    });

    categories.forEach((cat: any) => {
      if (cat.category) {
        sitemap += `
  <url>
    <loc>${appUrl}/blog/category/${cat.category.toLowerCase()}</loc>
    <priority>0.5</priority>
    <changefreq>weekly</changefreq>
  </url>`;
      }
    });

    sitemap += '\n</urlset>';
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  // SEO: Robots.txt
  app.get("/robots.txt", (req, res) => {
    const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
    const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${appUrl}/sitemap.xml`;
    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  // API route to download the project (Original)
  app.get("/api/download", (req, res) => {
    try {
      const zip = new AdmZip();
      const projectRoot = process.cwd();
      const addDirectoryToZip = (dirPath: string, zipPath: string) => {
        const items = fs.readdirSync(dirPath);
        for (const item of items) {
          if (item === 'node_modules' || item === '.git' || item === 'dist') continue;
          const fullPath = path.join(dirPath, item);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            addDirectoryToZip(fullPath, path.join(zipPath, item));
          } else {
            zip.addLocalFile(fullPath, zipPath);
          }
        }
      };
      addDirectoryToZip(projectRoot, "");
      const zipBuffer = zip.toBuffer();
      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', 'attachment; filename=linos-e-security-website.zip');
      res.set('Content-Length', zipBuffer.length.toString());
      res.send(zipBuffer);
    } catch (error) {
      console.error("Error generating zip:", error);
      res.status(500).send("Error generating zip file");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
