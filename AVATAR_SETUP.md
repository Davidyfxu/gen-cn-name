# Avatar 功能设置指南

## 概述

这个功能允许用户上传和更新个人头像，使用 Supabase Storage 来存储图片文件。

## 数据库设置

### 新项目

如果你是新项目，直接运行 `database/schema.sql` 即可，它已经包含了头像支持。

### 现有项目

如果你已经有现存的数据库，运行以下迁移脚本：

```sql
-- 在 Supabase SQL Editor 中运行
-- 来源: database/migration_add_avatar.sql

-- 添加头像字段到用户表
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 创建头像存储桶
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 设置存储策略（详细内容见迁移文件）
```

## 功能特性

### 用户界面

- **头像显示**: 在个人资料编辑器中显示 20x20 像素的圆形头像
- **上传按钮**: 编辑模式下显示相机图标按钮
- **即时预览**: 选择文件后立即显示预览
- **加载状态**: 上传过程中显示加载图标

### 文件验证

- **文件类型**: 仅支持图片文件（image/\*）
- **文件大小**: 最大 5MB
- **文件名**: 自动生成唯一文件名 `{user_id}/avatar-{timestamp}.{ext}`

### 存储策略

- **用户隔离**: 每个用户只能上传/更新/删除自己的头像
- **公开访问**: 所有头像都可以公开查看（用于显示）
- **文件覆盖**: 支持覆盖现有头像（upsert: true）

## 显示位置

头像会在以下位置显示：

1. **个人资料编辑器** (`components/dashboard/profile-editor.tsx`)
2. **导航栏用户菜单** (`components/navigation.tsx`)

## API 端点

### 上传流程

1. 用户选择图片文件
2. 客户端验证文件类型和大小
3. 上传到 Supabase Storage (`avatars` bucket)
4. 获取公共 URL
5. 更新用户 metadata 中的 `avatar_url`

### 存储路径结构

```
avatars/
  {user_id}/
    avatar-{timestamp}.jpg
    avatar-{timestamp}.png
    ...
```

## 故障排除

### 上传失败

1. 检查 Supabase Storage 是否已启用
2. 确认 `avatars` bucket 已创建且为公开
3. 验证 RLS 策略是否正确设置
4. 检查文件大小是否超过 5MB

### 头像不显示

1. 检查 `user.user_metadata.avatar_url` 是否存在
2. 确认图片 URL 可以公开访问
3. 检查网络连接和 CORS 设置

### 权限错误

1. 确认用户已认证 (`auth.uid()` 存在)
2. 检查文件路径是否以用户 ID 开头
3. 验证 Storage RLS 策略是否正确

## 自定义选项

### 修改文件大小限制

在 `components/dashboard/profile-editor.tsx` 中修改：

```typescript
// 当前: 5MB
if (file.size > 5 * 1024 * 1024) {
  // 修改为你需要的大小
}
```

### 修改头像尺寸

在相关组件中调整 CSS 类：

```tsx
// 个人资料页面 - 20x20
className = "w-20 h-20 rounded-full";

// 导航栏 - 8x8
className = "h-8 w-8";
```

### 添加图片压缩

可以在上传前添加客户端图片压缩，推荐使用库如 `browser-image-compression`。
