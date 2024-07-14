import { createRouter, createWebHistory } from 'vue-router'
import productos from '../views/apiProductos.vue'
import carrito from '../views/carritoProductos.vue'
const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/productos',
      component: productos
    },
    {
      path: '/carrito',
      component: carrito
    }
  ]
})

export default router
