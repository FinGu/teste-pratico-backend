import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { productValidator } from '#validators/product'

export default class ProductController {
  async index({ response }: HttpContext) {
    const products = await Product.all()

    return response.ok(products)
  }

  async store({ request, response, auth }: HttpContext) {
    if (!auth.user!.is_superuser()) {
        return response.forbidden({ error: true, response: 'Sem permissao' })
    }

    const payload = await request.validateUsing(productValidator)

    const product = await Product.create(payload)

    return response.created(product)
  }

  async show({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    return response.ok(product)
  }

  async update({ params, request, response, auth }: HttpContext) {
    if (!auth.user!.is_superuser()) {
        return response.forbidden({ error: true, response: 'Sem permissao' })
    }

    const product = await Product.findOrFail(params.id)

    const payload = await request.validateUsing(productValidator)

    product.merge(payload)

    await product.save()

    return response.ok(product)
  }

  async destroy({ params, response, auth }: HttpContext) {
    if (!auth.user!.is_superuser()) {
        return response.forbidden({ error: true, response: 'Sem permissao' })
    }

    const product = await Product.findOrFail(params.id)

    await product.delete()

    return response.noContent()
  }
}
