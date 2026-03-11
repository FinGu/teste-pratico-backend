import vine from '@vinejs/vine'

export const productValidator = vine.create({
  name: vine.string().maxLength(254),
  amount: vine.number().min(1),
})
