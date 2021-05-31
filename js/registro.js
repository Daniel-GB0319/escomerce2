const db = firebase.firestore();

const taskForm = document.getElementById('form_registro');

let editStatus = false;
let id = '';

//Funcion para guardar la informacion en la base de datos
const saveClientes = (nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente) =>
    //Creará la coleccion de la base de datos en Firebase
    //aquí se pondrá el nombre de cada entidad(si no existe, Firebase la creará en automático)
    db.collection('clientes').doc().set({
        nombreCliente,
        apCliente,
        amCliente,
        boletaCliente,
        emailCliente,
        passwordCliente,
        escuelaCliente,
        telCliente
    })
//Funcion para imprimir la informacion
const getClientes = () => db.collection('clientes').get();
const getCliente = (id) => db.collection('clientes').doc(id).get();
const onGetIClientes = (callback) => db.collection('clientes').onSnapshot(callback);
const deleteCliente = (id) => db.collection('clientes').doc(id).delete();
const editCliente = (id) => db.collection('clientes').doc(id).get();
const updateCliente = (id, updatedCliente) => db.collection('clientes').doc(id).update(updatedCliente);

//Imprimir

//Estructura de la informacion que se guardará a la base de datos
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Nombre de variable = nombre de la variable que guarda el id del div a editar['Nombre del id especifico a editar'].value;
    const nombreCliente = taskForm['llenar_nombre_cliente'].value;
    const apCliente = taskForm['llenar_a_paterno_cliente'].value;
    const amCliente = taskForm['llenar_a_materno_cliente'].value;
    const boletaCliente = taskForm['llenar_boleta_cliente'].value;
    const emailCliente = taskForm['llenar_email_cliente'].value;
    const passwordCliente = taskForm['llenar_password_cliente'].value;
    const escuelaCliente = taskForm['llenar_escuela_cliente'].value;
    const telCliente = taskForm['llenar_telefono_cliente'].value;
    await saveClientes(nombreCliente, apCliente, amCliente, boletaCliente, emailCliente, passwordCliente, escuelaCliente, telCliente);
    console.log("enviado")
    if (!editStatus) {
    
    } else {

        await updateCliente(id, {
            nombreCliente,
            apCliente,
            amCliente,
            boletaCliente,
            emailCliente,
            passwordCliente,
            escuelaCliente,
            telCliente
        });
        editStatus = false;

        //Boton de Guardar info (No tocar)
        taskForm['registrar'].innerText = 'Guardar';

    }

})