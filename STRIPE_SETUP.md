# Stripe 支付系统配置说明

本项目已从 creem.io 迁移到 Stripe 支付系统。以下是配置步骤：

## 1. 获取 Stripe API 密钥

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 登录或注册 Stripe 账户
3. 在左侧菜单中选择 "开发者" > "API 密钥"
4. 复制以下密钥：
   - **可发布密钥** (Publishable key): pk*test*... (测试环境) 或 pk*live*... (生产环境)
   - **秘密密钥** (Secret key): sk*test*... (测试环境) 或 sk*live*... (生产环境)

## 2. 配置环境变量

在项目根目录的 `.env.local` 文件中添加以下环境变量：

```bash
# Stripe 配置
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# 应用URL (用于支付成功/取消回调)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 3. 配置 Webhook

1. 在 Stripe Dashboard 中，转到 "开发者" > "Webhooks"
2. 点击 "添加端点"
3. 设置端点 URL: `https://your-domain.com/api/payment/webhook`
4. 选择以下事件类型：
   - `checkout.session.completed`
   - `checkout.session.expired`
5. 创建后，复制 "签名密钥" 并设置为 `STRIPE_WEBHOOK_SECRET`

## 4. 数据库兼容性

- ✅ 保持原有的 `creem_payment_id` 字段名不变
- ✅ 该字段现在存储 Stripe Checkout Session ID
- ✅ 无需运行额外的数据库迁移

## 5. 支付流程

1. 用户在仪表板中选择信用点数量
2. 系统创建 Stripe Checkout Session
3. 用户被重定向到 Stripe 托管的支付页面
4. 支付完成后，Stripe 发送 webhook 到应用
5. 应用处理 webhook，更新用户信用点

## 6. 测试

### 测试卡号

- **成功支付**: 4242 4242 4242 4242
- **失败支付**: 4000 0000 0000 0002
- **需要验证**: 4000 0025 0000 3155

### 测试流程

1. 确保使用测试环境的 API 密钥
2. 在 dashboard 页面尝试购买信用点
3. 使用测试卡号完成支付
4. 验证信用点是否正确添加到用户账户

## 7. 从 creem.io 迁移

如果您之前使用的是 creem.io，请：

1. ✅ 删除以下环境变量：
   - `CREEM_API_KEY`
   - `CREEM_API_URL`
   - `CREEM_PRODUCT_ID`
   - `CREEM_WEBHOOK_SECRET`

2. ✅ 添加上述 Stripe 环境变量

3. ✅ 现有的支付记录将继续在 `payments` 表中正常显示

## 支持

如有问题，请查看：

- [Stripe 文档](https://stripe.com/docs)
- [Stripe Checkout 集成指南](https://stripe.com/docs/checkout/quickstart)
- [Stripe Webhooks 指南](https://stripe.com/docs/webhooks)
