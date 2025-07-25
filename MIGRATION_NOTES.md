# 数据库迁移说明

## 🚀 迁移步骤

### 1. 运行数据库 Schema

在 Supabase SQL 编辑器中运行以下文件：

```sql
-- 执行 database/schema.sql 中的所有SQL语句
```

这个 schema 文件现在是幂等的（可以安全地重复运行），包含：

- `DROP ... IF EXISTS` 语句避免重复创建错误
- `CREATE OR REPLACE` 函数声明
- 自动处理已存在的对象

### 2. 配置 Google OAuth（可选）

1. 在 Supabase Dashboard 中：

   - 转到 Authentication → Settings → Auth Providers
   - 启用 "Google" provider

2. 在 Google Cloud Console 中：
   - 创建 OAuth 2.0 客户端 ID
   - 添加授权重定向 URI：`https://your-project-ref.supabase.co/auth/v1/callback`
   - 复制客户端 ID 和密钥到 Supabase

### 3. 验证迁移

运行 schema 后，验证以下内容：

✅ **表结构**：

```sql
SELECT * FROM public.users LIMIT 1;
```

✅ **RLS 策略**：

```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

✅ **触发器**：

```sql
SELECT tgname, tgrelid::regclass
FROM pg_trigger
WHERE tgname LIKE '%user%';
```

✅ **函数**：

```sql
SELECT proname, proargtypes
FROM pg_proc
WHERE proname LIKE '%user%';
```

### 4. 测试身份验证流程

1. **Email 注册测试**：

   - 访问应用主页
   - 点击"Get Your Chinese Name"
   - 选择"Sign up"
   - 使用 email 注册

2. **Google OAuth 测试**（如果已配置）：

   - 点击"Continue with Google"
   - 验证重定向和回调

3. **用户 Profile 验证**：
   - 登录后检查 dashboard
   - 确认用户有 1 个免费积分
   - 验证用户信息显示正确

## ⚠️ 故障排除

### 常见错误及解决方案

**错误**: `trigger "xxx" already exists`
**解决**: 重新运行更新后的 schema.sql 文件（现已修复）

**错误**: `function "xxx" already exists`  
**解决**: 函数使用`CREATE OR REPLACE`，应该自动覆盖

**错误**: `policy "xxx" already exists`
**解决**: 重新运行更新后的 schema.sql 文件（现已修复）

**错误**: Google OAuth 重定向失败
**解决**: 检查 Supabase 和 Google Cloud Console 中的回调 URL 配置

### 数据验证

确认用户创建触发器正常工作：

```sql
-- 检查最近创建的用户
SELECT u.id, u.email, u.created_at, p.credits
FROM auth.users u
LEFT JOIN public.users p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 5;
```

## 🎯 迁移完成检查清单

- [ ] 数据库 schema 成功执行
- [ ] 所有 RLS 策略已创建
- [ ] 用户触发器正常工作
- [ ] Email 注册功能正常
- [ ] Google OAuth 配置（可选）
- [ ] 用户 dashboard 显示正确
- [ ] 积分系统正常工作

完成所有检查后，你的应用就成功从 Clerk.js 迁移到 Supabase Auth 了！
