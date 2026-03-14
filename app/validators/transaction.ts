import vine from '@vinejs/vine'

export const transactionValidator = vine.create({
    amount: vine.number(),
    name: vine.string().maxLength(254),
    email: vine.string().email().maxLength(254),
    cardNumber: vine.string().minLength(13).maxLength(19),
    cvv: vine.string().minLength(0).maxLength(9999),
})
