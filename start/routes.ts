import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return 'Teste pratico'
})

router.post('/login', [controllers.Session, 'auth']).use(middleware.guest())

router.post('/transactions', [controllers.Purchase, 'create'])

router
  .group(() => {
    router.get('/gateways', [controllers.Gateway, 'index'])
    router.patch('/gateways/:id', [controllers.Gateway, 'update'])

    router.get('/transactions', [controllers.Purchase, 'list'])
    router.get('/transactions/:id', [controllers.Purchase, 'show'])
    router.post('/transactions/:id/charge_back', [controllers.Purchase, 'chargeback'])

    router.get('/clients', [controllers.Client, 'index'])
    router.get('/clients/:id', [controllers.Client, 'show'])

    router.get('/users', [controllers.User, 'index'])
    router.post('/users', [controllers.User, 'store'])
    router.patch('/users/:id', [controllers.User, 'update'])
    router.delete('/users/:id', [controllers.User, 'destroy'])

    router.get('/products', [controllers.Product, 'index'])
    router.get('/products/:id', [controllers.Product, 'show'])
    router.post('/products', [controllers.Product, 'store'])
    router.patch('/products/:id', [controllers.Product, 'update'])
    router.delete('/products/:id', [controllers.Product, 'destroy'])
  })
  .use(middleware.auth())
