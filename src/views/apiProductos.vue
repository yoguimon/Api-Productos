<template>
    <div class="container" id="lista-productos">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card border-0">
                    <div class="card-header" style="border: none; background-color: white;">
                    </div>
                    <div class="card-body">
                        <div class="row justify-content-center">
                            <div class="col-10 col-md-5 mb-5 me-5 pb-4 pe-0 ps-0" v-for="(product,index) in productos" style="border: 1px solid #CCCCCC">
                                <div class="row">
                                    <div class="col-12 col-md-5 text-center">
                                    <img :src="product.thumbnail" width="100%" height="100%">
                                    </div>
                                    <div class="col-12 col-md-7">
                                        <div class="text-center">
                                            <div class="bg-success p-3 text-start rounded-bottom-5 text-white mb-3">
                                                <p style="font-size: 25px;"><b>{{product.title}}</b></p>
                                            </div>
                                            <p>{{ponerEstrellas(product.rating)}}</p>
                                            <p><b class="fs-3">$ {{product.price}}</b><span> Antes: <del>$ {{product.discountPercentage}}</del></span></p>
                                            <p><b>Marca :</b> {{product.brand}}</p>
                                        </div>
                                        <div class="text-center">
                                            <button type="button" class="btn" @click="abrirModal(product.id,index)" :class="buscar(product.id)?'btn-dark disabled':'btn-success'"><i class="fas fa-plus me-2"></i><i class="fas fa-cart-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="modalProducto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="text-center">
                            <img :src="producto.thumbnail" class="rounded-circle border border-3 border-success" width="150px" height="150px">
                            <p class="fs-5"><b>{{producto.title}}</b></p>
                        </div>
                        <div class="mt-1 pe-3 ps-3">
                            <p><b>Descripción: </b>{{producto.description}}</p>
                        </div>
                        <div class="text-center mt-4 mb-3">
                            <p><b>Cantidad:</b></p>
                            <div class="btn-group">
                                <button type="button" class="btn btn-success" @click="decrementar()"><i class="fas fa-minus"></i></button>
                                <button type="button" class="btn btn-sm btn-outline">{{cantidad}}</button>
                                <button type="button" class="btn btn-success" @click="incrementar()"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-6">
                            <div class="text-center mb-3 d-flex justify-content-around">
                                <button type="button" class="btn btn-success" @click="cerrarModal()">Cancelar</button>
                                <button type="button" class="btn btn-success" @click="agregarACarrito()">Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
        let productosLocal = localStorage.getItem("productos") != null ? JSON.parse(localStorage.getItem("productos")) : [];
        let urlBase = "https://dummyjson.com/products";
        const productos = ref([]);
        const producto = ref({});
        let modal = null;
        let instanciaModal = null;
        let cantidad = ref(1);
        let posIndex = 0;
        onMounted(() => {
            listarProductos();
            modal = document.getElementById("modalProducto");
            instanciaModal = new Modal(modal);
        });
        const listarProductos = async () =>{
            try {
                const {data} = await axios.get(urlBase);
                productos.value = data.products;
            } catch (error) {
                console.log(error);
            }
        }
        async function abrirModal(id,index){
            instanciaModal.show();
            posIndex=index;
            try {
                const {data} = await axios.get(urlBase+"/"+id);
                producto.value = data;
            } catch (error) {
                console.log(error);
            }
        }
        function cerrarModal(){
            instanciaModal.hide();
            cantidad.value=1;
        }
        function incrementar(){
            cantidad.value++;
        }
        function decrementar(){
            if(cantidad.value>1){
                cantidad.value--;
            }
        }
        function agregarACarrito(){
            let producto = productos.value[posIndex];
            producto.cantidad = cantidad.value;
            producto.subtotal = producto.price*cantidad.value;
            productosLocal.push(producto)
            localStorage.setItem("productos", JSON.stringify(productosLocal));

            Swal.fire({
            title: "Agregado",
            text: "Se agrego a carrito corretamente",
            icon: "success",
            confirmButtonColor: '#198754'
            });
            instanciaModal.hide();
            cantidad.value=1;
        }
        function ponerEstrellas(rating){
            let entero = Math.round(parseInt(rating));
            let res = "";
            for(let i=0;i<entero;i++){
                res = res + "⭐";
            }
            return res;
        }
        function buscar(param){
            for(let i=0; i<productosLocal.length;i++){
                if(productosLocal[i].id==param){
                    return true;
                }
            }
            return false;
        }
</script>
<style>
    
</style>