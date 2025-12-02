# ⚡ Pivotal‑Pro AI — Backend  
Enterprise‑grade backend for Pivotal‑Pro AI, built with **NestJS + Prisma**.  
Provides secure APIs, rule execution engines, AI proxy, user auth, and data persistence.

<p align="center">
  <img src="https://dummyimage.com/1200x260/0d1117/ffffff&text=Pivotal-Pro+AI" />
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/NestJS-Framework-ea2845?style=for-the-badge&logo=nestjs" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Prisma-ORM-2d3748?style=for-the-badge&logo=prisma" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-Backend-blue?style=for-the-badge&logo=typescript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Docker-Ready-2496ed?style=for-the-badge&logo=docker" /></a>
</p>

---

## 🔥 Overview  
This backend provides:  
- Authentication + sessions  
- AI proxy (Gemini, future LLMs)  
- Rule engine execution  
- Dashboard data API  
- Persistent storage via Prisma  
- Modular NestJS architecture  

Perfect for high‑scale BI, underwriting, rule evaluation, and enterprise AI workflows.

---

## 🧩 Key Features  

### 🏗 NestJS Architecture  
- Modules, controllers, services  
- Built‑in dependency injection  
- High testability  

### 🗄 Prisma + DB  
- Prisma schema + migrations  
- PostgreSQL / MySQL ready  
- Auto‑generated types  

### 🔐 Security  
- Environment‑based config  
- Token auth  
- Clean proxying of AI keys  

### 🧠 AI Proxy  
- Server‑side Gemini calls  
- Avoid exposing keys in frontend  

---

## 📁 Project Structure  

```
src/
 ├── modules/
 ├── controllers/
 ├── services/
 ├── interceptors/
 ├── filters/
 └── main.ts

prisma/
 ├── schema.prisma
 └── migrations/

Dockerfile
package.json
```

---

## ⚙️ Getting Started  

### Installation  
```bash
git clone https://github.com/krishnavarshney/Pivotal-Pro-AI-backend.git
cd Pivotal-Pro-AI-backend
npm install
```

### Environment  
```bash
cp .env.example .env
```

Add:  
```
DATABASE_URL=postgresql://user:pass@localhost:5432/pivotal
PORT=8000
JWT_SECRET=your-secret
```

### Migrations  
```bash
npx prisma migrate dev
```

### Start Development  
```bash
npm run start:dev
```

---

## 🐳 Docker  
```bash
docker build -t pivotal-ai-backend .
docker run -p 8000:8000 pivotal-ai-backend
```

---

## 🧪 Testing  
```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## 🚀 Production Checklist  
- Enable HTTPS  
- Run Prisma migrations on boot  
- Use managed DB (RDS / Cloud SQL)  
- Configure PM2 or Docker healthchecks  

---

## 🤝 Contributing  
1. Create a feature branch  
2. Ensure code follows NestJS style  
3. Add tests where needed  
4. Submit PR  

---

## 📄 License  
MIT License  
Maintained by **Krishna Varshney**  
