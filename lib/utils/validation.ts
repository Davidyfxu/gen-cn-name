/**
 * 表单验证工具
 * 统一管理所有表单验证逻辑
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * 邮箱验证
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
}

/**
 * 密码验证
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      error: "Password must be at least 6 characters long",
    };
  }

  return { isValid: true };
}

/**
 * 确认密码验证
 */
export function validatePasswordConfirm(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (!confirmPassword) {
    return { isValid: false, error: "Please confirm your password" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true };
}

/**
 * 姓名验证
 */
export function validateFullName(
  name: string,
  required = true
): ValidationResult {
  if (required && !name.trim()) {
    return { isValid: false, error: "Full name is required" };
  }

  if (required && name.trim().length < 2) {
    return {
      isValid: false,
      error: "Full name must be at least 2 characters long",
    };
  }

  return { isValid: true };
}

/**
 * 文件大小验证
 */
export function validateFileSize(file: File, maxSizeMB = 5): ValidationResult {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }

  return { isValid: true };
}

/**
 * 图片文件类型验证
 */
export function validateImageFile(file: File): ValidationResult {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Please select an image file (JPEG, PNG, WebP)",
    };
  }

  return { isValid: true };
}

/**
 * 组合验证器 - 验证多个字段
 */
export class FormValidator {
  private errors: Record<string, string> = {};

  /**
   * 添加字段验证
   */
  validateField(
    fieldName: string,
    value: string,
    validator: (value: string) => ValidationResult
  ): this {
    const result = validator(value);
    if (!result.isValid && result.error) {
      this.errors[fieldName] = result.error;
    } else {
      delete this.errors[fieldName];
    }
    return this;
  }

  /**
   * 自定义验证
   */
  addCustomValidation(
    fieldName: string,
    condition: boolean,
    errorMessage: string
  ): this {
    if (!condition) {
      this.errors[fieldName] = errorMessage;
    } else {
      delete this.errors[fieldName];
    }
    return this;
  }

  /**
   * 获取所有错误
   */
  getErrors(): Record<string, string> {
    return { ...this.errors };
  }

  /**
   * 获取特定字段的错误
   */
  getFieldError(fieldName: string): string | undefined {
    return this.errors[fieldName];
  }

  /**
   * 检查是否有错误
   */
  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * 检查表单是否有效
   */
  isValid(): boolean {
    return !this.hasErrors();
  }

  /**
   * 清除所有错误
   */
  clearErrors(): this {
    this.errors = {};
    return this;
  }

  /**
   * 清除特定字段的错误
   */
  clearFieldError(fieldName: string): this {
    delete this.errors[fieldName];
    return this;
  }
}

/**
 * 预定义的验证器集合
 */
export const validators = {
  email: validateEmail,
  password: validatePassword,
  passwordConfirm: validatePasswordConfirm,
  fullName: validateFullName,
  fileSize: validateFileSize,
  imageFile: validateImageFile,
};

/**
 * 验证Auth表单的工具函数
 */
export function validateAuthForm(
  email: string,
  password: string,
  fullName?: string,
  confirmPassword?: string
): { isValid: boolean; errors: Record<string, string> } {
  const validator = new FormValidator();

  validator
    .validateField("email", email, validateEmail)
    .validateField("password", password, validatePassword);

  if (fullName !== undefined) {
    validator.validateField("fullName", fullName, (name) =>
      validateFullName(name, true)
    );
  }

  if (confirmPassword !== undefined) {
    validator.validateField("confirmPassword", confirmPassword, (confirm) =>
      validatePasswordConfirm(password, confirm)
    );
  }

  return {
    isValid: validator.isValid(),
    errors: validator.getErrors(),
  };
}
