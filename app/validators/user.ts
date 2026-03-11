import vine from '@vinejs/vine'

export const userValidator = vine.create({
  email: vine.string().email().maxLength(254),
  password: vine.string().minLength(4),
  role: vine.enum(['ADMIN', 'MANAGER', 'FINANCE', 'USER']),
  fullName: vine.string().optional()
})
