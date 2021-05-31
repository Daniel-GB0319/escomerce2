const db = firebase.firestore();

const taskForm = document.getElementById('form_datos_int');
const taskContainer = document.getElementById('printIntegrantes');

let editStatus = false;
let id = '';

//Funcion para guardar la informacion en la base de datos
const saveIntegrantes = (url_foto, nombre_integrante, escuela_integrante, desc_integrante, social_integrante) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('clientes').doc().set({
        url_foto,
        nombre_integrante,
        escuela_integrante,
        desc_integrante,
        social_integrante
    })
//Funcion para imprimir la informacion
const getIntegrantes = () => db.collection('clientes').get();
const getIntegrante = (id) => db.collection('clientes').doc(id).get();
const onGetIntegrantes = (callback) => db.collection('clientes').onSnapshot(callback);
const deleteIntegrante = (id) => db.collection('clientes').doc(id).delete();
const editIntegrante = (id) => db.collection('clientes').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('clientes').doc(id).update(updatedIntegrante);

//Imprimir
window.addEventListener('DOMContentLoaded', async (e) => {

    onGetIntegrantes((querySnapshot) => {
        //Borra el contenido anterior dentro del div
        taskContainer.innerHTML = '';
        //Imprimimos los datos guardados en FireBase en la consola
        querySnapshot.forEach(doc => {

            const clientesDato = doc.data()
            clientesDato.id = doc.id;

            //Genera un html
            taskContainer.innerHTML += '<div class="mb-3">
            <label class="form-label" for="name">Nombre</label><input class="form-control item" type="text" id="nombre_usa12" placeholder="Nombre(s)" required="true"></div>
        <div class="mb-3">
            <label class="form-label" for="password">Apellidos</label>
            <input class="form-control" id="a_paterno12" type="text" placeholder="A. Paterno" required="true">
            <input class="form-control" id="a_materno12" type="text" placeholder="A. Materno" required="true" style="margin-top: 10px;"></div>
        <div class="mb-3" id="no_boleta_empleado12">
            <label class="form-label" for="email">Boleta</label><input class="form-control" type="number" placeholder="No. Boleta o de empleado" min="2" max="19999999999999"></div>
        <div class="mb-3" id="correo_cuenta12">
            <label class="form-label" for="email">Correo</label><input class="form-control" type="email" placeholder="Correo institucional" required="true"></div>
        <div class="mb-3" id="contraseña_cuenta12">
            <label class="form-label" for="email">Contraseña</label><input class="form-control" type="password" placeholder="Contraseña de 8 a 16 caracteres" required="true"></div>
        <div class="mb-3" id="contraseña_cuenta42">
            <label class="form-label" for="email">Repite la contraseña</label><input class="form-control" type="password" placeholder="Contraseña de 8 a 16 caracteres" required="true"></div>
        <div class="mb-3" id="escuela_procedencia12">
            <label class="form-label" for="email">Escuela</label>
            <select class="form-select" required="true">
                <option value="12" selected="">Escuela de procedencia</option>
                <option value="13">ESCOM</option>
                <option value="14">ESIME Z</option>
            </select></div>
        <div class="mb-3">
            <label class="form-label" for="email">Teléfono</label>
            <input class="form-control" id="telefono_10dig12" type="tel" placeholder="10 dígitos (opcional)"></div>
        <div class="mb-3">
            <div class="form-check">
                <input class="form-check-input" id="vendedor12" type="checkbox">
                <label class="form-check-label" for="formCheck-1">Quiero ser vendedor</label>
            </div>
        </div>
        <div class="d-block mb-3">
            <label class="form-label" for="email">INE</label>
            <input class="form-control" id="ine12" type="file">
        </div>
        <div class="d-block mb-3">
            <label class="form-label" for="email">Cuenta CLABE</label>
            <input class="form-control" id="cuenta_clabe12" type="text" placeholder="No. cuenta CLABE">
        </div>
        <button class="btn btn-primary" id="actualizar_datos" type="submit" style="background: rgb(52, 73, 94);border-color: rgb(52, 73, 94);border-top-color: rgb(52,border-right-color 73,border-bottom-color 94);border-left-color: 73,;"
        onclick="inicio()">Actualizar datos</button>>'

            const btnDelete = document.querySelectorAll('.btn-delete');
            //console.log(btnDelete)
            btnDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    console.log(e.target.dataset.id)
                    await deleteIntegrante(e.target.dataset.id)
                })
            })
            const btnEdit = document.querySelectorAll('.btn-edit');
            btnEdit.forEach(btn => {

                btn.addEventListener('click', async (e) => {
                    const doc = await getIntegrante(e.target.dataset.id);
                    const integrante = doc.data();

                    editStatus = true;
                    id = doc.id;

                    taskForm['llenar_foto'].value = integrante.url_foto;
                    taskForm['llenar_nombre'].value = integrante.nombre_integrante;
                    taskForm['llenar_escuela'].value = integrante.escuela_integrante;
                    taskForm['llenar_desc'].value = integrante.desc_integrante;
                    taskForm['llenar_social'].value = integrante.social_integrante;

                    //Boton de actualizar info (No Tocar)
                    taskForm['subir_registro'].innerText = 'Update';
                })
            })
        })

    })

});

//Estructura de la informacion que se guardará a la base de datos
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;
    const url_foto = taskForm['llenar_foto'].value;
    const nombre_integrante = taskForm['llenar_nombre'].value;
    const escuela_integrante = taskForm['llenar_escuela'].value;
    const desc_integrante = taskForm['llenar_desc'].value;
    const social_integrante = taskForm['llenar_social'].value;

    if (!editStatus) {
        await saveIntegrantes(url_foto, nombre_integrante, escuela_integrante, desc_integrante, social_integrante);
    } else {

        await updateIntegrante(id, {
            url_foto,
            nombre_integrante,
            escuela_integrante,
            desc_integrante,
            social_integrante
        });
        editStatus = false;

        //Boton de Guardar info (No tocar)
        taskForm['subir_registro'].innerText = 'Guardar';

    }

    getIntegrantes();
    taskForm.reset();


    //console.log(url_foto, nombre_integrante);
})