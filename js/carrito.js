const db = firebase.firestore();

const taskForm = document.getElementById('pagar_div');
const taskContainer = document.getElementById('impr-carrito');
const getPago = document.getElementById('impr-carrito');
const printPago = document.getElementById('pagar_div');


let carritoOn = false;
let editStatus = false;
let id = '';
const sumaPago = 0;

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
const getIntegrante = (id) => db.collection('producto').doc(id).get();
const addCarrito = (idProducto) => db.collection('carrito').doc().set({ idProducto });
const onGetIntegrantes = (callback) => db.collection('carrito').onSnapshot(callback);
const deleteProductoCarrito = (id) => db.collection('carrito').doc(id).delete();
const editIntegrante = (id) => db.collection('producto').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('producto').doc(id).update(updatedIntegrante);
const onGetProductos = (callback) => db.collection('producto').onSnapshot(callback);
const getProducto = (id) => db.collection('producto').doc(id).get();
//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetIntegrantes((querySnapshot) => {
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
            '<div class="col-6 col-md-2 quantity"><label class="form-label d-none d-md-block" for="quantity">Cantidad</label><input type="number" id="number" class="form-control quantity-input" value="1"></div>' +
            '<div class="col-6 col-md-2 price"><span>x$' + infoDato.prec_prod + '</span></div><div class="d-flex justify-content-around product-name " style="margin-top: 30px; "><button class="btn btn-primary btn-delete" data-id="'+infoDato.id+'" type="button " style="background: rgb(13,136,208); ">Eliminar</button>' +
            '</div>' +
            '</div>';
            let precio = infoDato.prec_prod;
            var precioTotal = 0;
            precioTotal = precio + precioTotal;
            console.log(precioTotal)
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
            //console.log(infoDato.id)
        })

    })

});

//Estructura de la informacion que se guardará a la base de datos
window.addEventListener('DOMContentLoaded', async (e) => { 
    
    const pago = sumaPago;
    const x = 5;
    const y = 20;
    function suma(x,y){
        const c =x+y;
        console.log(c)
    }
    
})
