<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div id="nav">
    <div class="row justify-content-center">
      <div class="col-4">
        <nav class="container">
      <div class="navbar-nav mr-auto">
        <RouterLink to="/productos" class="nav-item nav-link">Productos</RouterLink>
        <RouterLink to="/carrito" class="nav-item nav-link">Carrito</RouterLink>
      </div>
    </nav>
      </div>
    </div>
  </div>

  <RouterView />
</template>

<style>
#nav {
  font-size: 25px;
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: #198754;
  border-radius: .5rem;
}
</style>
