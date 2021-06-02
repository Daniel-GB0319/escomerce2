const db = firebase.firestore();

const taskContainer = document.getElementById('impr-carrito');
const getPago = document.getElementById('impr-carrito');
const printPago = document.getElementById('pagar-div');


let carritoOn = false;
let editStatus = false;

let id = '';
//Funcion para guardar la informacion en la base de datos
const saveIntegrantes = (nombre_prod, desc_prod, cant_prod, prec_prod, cond_prod, url_prod, calif_prod, cat_prod) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('producto').doc().set({
        nombre_prod,
        desc_prod,
        cant_prod,
        prec_prod,
        cond_prod,
        url_prod,
        calif_prod,
        cat_prod
    })

//Funcion para imprimir la informacion
const getIntegrantes = () => db.collection('producto').get();
const getIntegrante = (id) => db.collection('carrito').doc(id).get();
const addCarrito = (idProducto, nombre_prod, desc_prod, cant_prod, prec_prod, cond_prod, url_prod, calif_prod, cat_prod, cant_prod_car) => db.collection('carrito').doc().set({ idProducto, nombre_prod, desc_prod, cant_prod, prec_prod, cond_prod, url_prod, calif_prod, cat_prod, cant_prod_car });
const updateCarrito = (id, cant_prod_car) => db.collection('carrito').doc(id).update(cant_prod_car);
const onGetIntegrantes = (callback) => db.collection('carrito').onSnapshot(callback);
const deleteProductoCarrito = (id) => db.collection('carrito').doc(id).delete();
const editIntegrante = (id) => db.collection('producto').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('producto').doc(id).update(updatedIntegrante);
const onGetProductos = (callback) => db.collection('producto').onSnapshot(callback);
const getProducto = (id) => db.collection('producto').doc(id).get();
const onGetPrecio = (callback) => db.collection('producto').onSnapshot(callback);


//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetIntegrantes((querySnapshot) => {

        //Guardamos los precios en este array
        var arrayPrecios = [];

        //Borra el contenido anterior dentro del div
        taskContainer.innerHTML = '';
        //Imprimimos los datos guardados en FireBase en la consola
        querySnapshot.forEach(doc => {

            const infoDato = doc.data()
            //ID CARRITO
            infoDato.id = doc.id;

            //console.log('ID Producto:'+infoDato.idProducto);
            //console.log('ID Carrito: '+infoDato.id);
            //const sacarDato = getProducto(infoDato.id);
            //console.log(sacarDato);
            //Genera un html
            taskContainer.innerHTML += '<div class="product">' +
                '<div class="row justify-content-center align-items-center">' +
                '<div class="col-md-3">' +
                '<div class="product-image"><img class="img-fluid d-block mx-auto image" src="' + infoDato.url_prod + '"></div>' +
                '</div>' +
                '<div class="col-md-5 product-info"><a class="product-name" href="#" style="color: rgb(13,136,208);">' + infoDato.nombre_prod + '</a>' +
                '<div class="product-specs">' +
                '<div><span>Detalles:&nbsp;</span><span class="value">' + infoDato.desc_prod + '</span></div>' +
                '<div></div>' +
                '<div></div>' +
                '<div></div>' +
                '</div>' +
                '</div>' +
                '<div class="col-6 col-md-2 quantity"><label class="form-label d-none d-md-block" for="quantity">Cantidad</label><input type="number" id="' + infoDato.id + '" data-id="' + infoDato.id + '" class="form-control quantity-input valor" min="1" max="'+infoDato.cant_prod+'"value="' + infoDato.cant_prod_car + '"></div>' +
                '<div class="col-6 col-md-2 price"><span>$ ' + infoDato.prec_prod + '</span></div><div class="d-flex justify-content-around product-name " style="margin-top: 30px; "><button class="btn btn-primary btn-delete" data-id="' + infoDato.id + '" type="button " style="background: rgb(13,136,208); ">Eliminar</button>' +
                '</div>' +
                '</div>';
            let precio = Number(infoDato.prec_prod);

            const addCantidad = document.querySelectorAll('.valor');

            addCantidad.forEach((valor) => {
                valor.addEventListener('click', async (e) => {
                    const doc = await getIntegrante(e.target.dataset.id);
                    const idProductoCarrito = doc.id; //ID CARRITO
                    const cant_update = (doc.data());
                    const datoCantidad = document.getElementById(e.target.dataset.id)
                    const cant_prod_car = Number(datoCantidad.value);


                    var DBproduc = db.collection("producto");
                    //Consulta en firebase para conseguir nombre del producto 
                    DBproduc.where("nombre_prod", "==", cant_update.nombre_prod).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                //Aqui validamos si el ID del producto coincide con el ID del producto en el carrito
                                datoOficial = doc.data()
                                if (doc.id == cant_update.idProducto) {
                                    const prec_prod = Number(cant_prod_car * datoOficial.prec_prod);
                                    console.log(doc.id, " => ", prec_prod);
                                    //Valida que la cantidad esté dentro del
                                    if ((cant_prod_car > datoOficial.cant_prod)) {
                                        console.log('No hay tantos productos');
                                        cant_prod_car.value = datoOficial.cant_prod;

                                    }
                                    if ((cant_prod_car < 1)) {
                                        console.log('No puedes tener menos de esos productos');
                                        cant_prod_car.value = 1;
                                    } else {
                                        updateCarrito(idProductoCarrito, { cant_prod_car, prec_prod })
                                        console.log('Enviado')  
                                    }

                                }

                            });
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });

                })
            })

            arrayPrecios.push(precio);
            console.log(arrayPrecios);
            const btnDelete = document.querySelectorAll('.btn-delete');
            //console.log(btnDelete)
            btnDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    console.log(e.target.dataset.id)
                    await deleteProductoCarrito(e.target.dataset.id);
                })
            })

            const btnAdd = document.querySelectorAll('.btn-add');

            btnAdd.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getIntegrante(e.target.dataset.id);
                    const datoActualizar = doc.data();
                    console.log(e.target.dataset.id)
                    const idProducto = e.target.dataset.id
                    await addCarrito(idProducto);
                })
            })
        })



        //Aquí agregamos la suma total de los productos
        var sumaPago = 0;
        var sumaTOTAL = 0;
        for (var i = 0; i < arrayPrecios.length; i++) {
            sumaPago += arrayPrecios[i];
        }
        
        sumaTOTAL += sumaPago;
    

        printPago.innerHTML = '<div class="summary" style="background: url(&quot;https://cdn.bootstrapstudio.io/placeholders/1400x800.png&quot;);">' +
            '<h3 style="color: rgb(13,136,208);">Resumen</h3>' +
            '<h4><span class="text">Subtotal</span><span class="price">$' + sumaPago + '</span></h4>' +
            '<h4><span class="text">Descuento</span><span class="price">$0</span></h4>' +
            '<h4><span class="text">Costo de envío</span><span class="price">$0</span></h4>' +
            '<h4><span class="text" style="color: rgb(13,136,208);">Total</span><span class="price" style="color: rgb(13,136,208);">$ '+sumaTOTAL+'</span></h4><button class="btn btn-primary btn-lg d-block w-100" type="button" style="background: rgb(13,136,208);"' +
            'onclick="realizarPedido()">Proceder al pago</button>' +
            '</div>';

    })
    console.log(precioRealProducto(id))

});