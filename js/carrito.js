const db = firebase.firestore();

const taskForm = document.getElementById('imp-catalogo');
const taskContainer = document.getElementById('impr-carrito');

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
const getIntegrante = (id) => db.collection('producto').doc(id).get();
const addCarrito = (idProducto) => db.collection('carrito').doc().set({ idProducto });
const onGetIntegrantes = (callback) => db.collection('producto').onSnapshot(callback);
const deleteIntegrante = (id) => db.collection('producto').doc(id).delete();
const editIntegrante = (id) => db.collection('producto').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('producto').doc(id).update(updatedIntegrante);

//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetIntegrantes((querySnapshot) => {
        //Borra el contenido anterior dentro del div
        taskContainer.innerHTML = '';
        //Imprimimos los datos guardados en FireBase en la consola
        querySnapshot.forEach(doc => {

            const infoDato = doc.data()
            infoDato.id = doc.id;
            //console.log(infoDato);
            //Genera un html
            taskContainer.innerHTML += '<div class="product">' +
                '<div class="row justify-content-center align-items-center">' +
                '<div class="col-md-3">' +
                '<div class="product-image"><img class="img-fluid d-block mx-auto image" src="assets/img/subirImagen.png"></div>' +
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
                '<div class="col-6 col-md-2 price"><span>x$' + infoDato.prec_prod + '</span></div>' +
                '</div>' +
                '</div>';

            const btnDelete = document.querySelectorAll('.btn-delete');
            //console.log(btnDelete)
            btnDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    console.log(e.target.dataset.id)
                    await deleteIntegrante(e.target.dataset.id);
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

            const btnEdit = document.querySelectorAll('.btn-edit');
            btnEdit.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getIntegrante(e.target.dataset.id);
                    const datoActualizar = doc.data();

                    editStatus = true;
                    //Obtenemos el id del producto
                    id = doc.id;
                    taskForm['nombre_producto'].value = datoActualizar.nombre_prod;
                    taskForm['desc_producto'].value = datoActualizar.desc_prod;
                    taskForm['cantidad_producto'].value = datoActualizar.cant_prod;
                    taskForm['precio_producto'].value = datoActualizar.prec_prod;
                    taskForm['condicion_producto'].value = datoActualizar.cond_prod;
                    taskForm['foto_producto'].value = datoActualizar.url_prod;
                    taskForm['calif_producto'].value = datoActualizar.calif_prod
                    taskForm['categoria_producto'].value = datoActualizar.cat_prod;
                    //Boton de actualizar info (No Tocar)
                    taskForm['subir_registro'].innerText = 'Update';
                })
            })
            console.log(infoDato.id)
        })

    })

});

//Estructura de la informacion que se guardará a la base de datos
