<template>
    <div class="container mt-4" id="carrito-productos">
        <div class="row">
            <div class="col-12 col-md-12 mt-3">
                <div class="card">
                    <div class="card-header card-titulo bg-success">
                        <h5 class="card-title text-white"><i class="fas fa-cart-plus me-2"></i>Lista carrito</h5>
                        
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table" id="tabla-carrito">
                                <thead class="table-success">
                                    <tr>
                                        <th>Nro</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Categoria</th>
                                        <th>Calificacion</th>
                                        <th>Precio($)</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product,index) in productosCarrito">
                                        <td>{{index+1}}</td>
                                        <td><img :src="product.images" width="50px" height="50px"></td>
                                        <td>{{product.title}}</td>
                                        <td>{{product.category}}</td>
                                        <td>{{ponerEstrellas(product.rating)}}</td>
                                        <td>{{(product.price).toFixed(2)}}</td>
                                        <td>{{product.cantidad}}</td>
                                        <td>{{(product.price*product.cantidad).toFixed(2)}}</td>
                                        <td><button type="button" class="btn btn-success btn-sm" @click="eliminar(index)"><i class="fas fa-trash"></i></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="row">
                            <div class="col-5 offset-7 col-md-4 offset-md-8">
                                <label class="form-label">Total</label>
                                <input type="text" class="form-control form-control-lg text-end bg-success text-white" v-model="total" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-3 d-flex justify-content-between">
                    <RouterLink to="/productos" class="btn btn-success btn-lg">Cancelar</RouterLink>
                <button type="button" class="btn btn-success btn-lg" @click="guardarCarrito()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import Swal from 'sweetalert2';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const productosCarrito = ref([]);
    const total = ref(0);
    onMounted(() => {
        let productosLocal = localStorage.getItem("productos") != null ? JSON.parse(localStorage.getItem("productos")) : [];
        productosCarrito.value = productosLocal;
        sumar();
    });
    function sumar(){
        for(let i=0;i<productosCarrito.value.length;i++){
            total.value = total.value + productosCarrito.value[i].subtotal;
        }
        total.value = parseFloat(total.value.toFixed(2));
    }
    
    function eliminar(i){
        total.value=0;
        productosCarrito.value.splice(i,1);
        localStorage.setItem("productos", JSON.stringify(productosCarrito.value));
        sumar();
    }
    function ponerEstrellas(rating){
        let entero = Math.round(parseInt(rating));
        let res = "";
        for(let i=0;i<entero;i++){
            res = res + "⭐";
        }
        return res;
    }
    function guardarCarrito(){
        Swal.fire({
        title: 'Guardado',
        text: 'Se guardo el carrito correctamente',
        icon: 'success',
        confirmButtonColor: '#198754'
        }).then(() => {
            total.value = 0;
            productosCarrito.value = [];
            localStorage.setItem('productos', JSON.stringify(productosCarrito.value));
            router.push('/productos');
        });
    }

</script>
<style>
    
</style>