import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'session.auth': { paramsTuple?: []; params?: {} }
    'purchase.create': { paramsTuple?: []; params?: {} }
    'gateway.index': { paramsTuple?: []; params?: {} }
    'gateway.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchase.list': { paramsTuple?: []; params?: {} }
    'purchase.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchase.chargeback': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.index': { paramsTuple?: []; params?: {} }
    'client.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.index': { paramsTuple?: []; params?: {} }
    'user.store': { paramsTuple?: []; params?: {} }
    'user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.index': { paramsTuple?: []; params?: {} }
    'product.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.store': { paramsTuple?: []; params?: {} }
    'product.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'gateway.index': { paramsTuple?: []; params?: {} }
    'purchase.list': { paramsTuple?: []; params?: {} }
    'purchase.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.index': { paramsTuple?: []; params?: {} }
    'client.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.index': { paramsTuple?: []; params?: {} }
    'product.index': { paramsTuple?: []; params?: {} }
    'product.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'gateway.index': { paramsTuple?: []; params?: {} }
    'purchase.list': { paramsTuple?: []; params?: {} }
    'purchase.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.index': { paramsTuple?: []; params?: {} }
    'client.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.index': { paramsTuple?: []; params?: {} }
    'product.index': { paramsTuple?: []; params?: {} }
    'product.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'session.auth': { paramsTuple?: []; params?: {} }
    'purchase.create': { paramsTuple?: []; params?: {} }
    'purchase.chargeback': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.store': { paramsTuple?: []; params?: {} }
    'product.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'gateway.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'user.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}