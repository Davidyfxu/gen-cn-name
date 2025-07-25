# 环境变量配置

创建一个 `.env.local` 文件在项目根目录，包含以下配置：

```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth (configured in Supabase Dashboard)
# No additional environment variables needed for Google OAuth

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxxxxxxxx

# Creem.io Payment
CREEM_API_KEY=cak_test_xxxxxxxxxxxxxxxxxxxxxx
CREEM_PRODUCT_ID=prod_xxxxxxxxxxxxxxxxxxxxxx

# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxx
```

## 配置说明

### 身份验证配置

使用Supabase原生身份验证，支持：
- Email/密码登录
- Google OAuth登录

配置Google OAuth:
1. 在Supabase Dashboard中转到Authentication → Settings → Auth Providers
2. 启用Google provider并配置OAuth应用

### Supabase 配置

1. `NEXT_PUBLIC_SUPABASE_URL`: Supabase 项目 URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 匿名访问密钥
3. `SUPABASE_SERVICE_ROLE_KEY`: Supabase 服务角色密钥（用于服务端操作）

### 支付配置

1. `CREEM_API_KEY`: Creem.io API 密钥
2. `CREEM_PRODUCT_ID`: Creem.io 产品 ID

### AI 配置

1. `OPENAI_API_KEY`: OpenAI API 密钥（用于生成中文名字）

## 重要提醒

⚠️ **不要将 `.env.local` 文件提交到版本控制系统！**

该文件已在 `.gitignore` 中排除，确保敏感信息不会被意外提交。
