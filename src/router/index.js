import { createRouter, createWebHistory } from 'vue-router'
import productos from '../views/apiProductos.vue'
import carrito from '../views/carritoProductos.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
