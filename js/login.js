const db = firebase.firestore();
/*const taskForm = document.getElementById('form_login');*/
addEventListener('click', async (e) => {
    var email = document.getElementById('emailCliente').value;
    var password = document.getElementById('passwordCliente').value;
    var op;
    db.collection("clientes").where("emailCliente", "==", email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
            // doc.data() is never undefined for query doc snapshots
            const dato = doc.get("emailCliente");
            const dato1 = doc.get("passwordCliente");
            if(email=dato){
                console.log("ya registrado");
                if(password==dato1){
                    console.log("acceso correcto");
                    op = 0;
                    addEventListener('submit', async (e) => {
                        window.location = "./index.html";
                    });
                }else{
                    console.log("contraseña incorrecta");
                    op = 1;
                }
        }else{
            //mensaje de error
            console.log("correo no registrado")
            op = 1;
        }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
})



//Funcion para imprimir la informacion
/*const getIntegrantes = () => db.collection('clientes').get();
const getIntegrante = (id) => db.collection('clientes').doc(id).get();
const onGetIntegrantes = (callback) => db.collection('clientes').onSnapshot(callback);
const deleteIntegrante = (id) => db.collection('clientes').doc(id).delete();
const editIntegrante = (id) => db.collection('clientes').doc(id).get();
const updateIntegrante = (id, updatedIntegrante) => db.collection('clientes').doc(id).update(updatedIntegrante);
*/
/*function login() {
    window.addEventListener('DOMContentLoaded', async (e) => {

        onGetIntegrantes((querySnapshot) => {
            //Imprimimos los datos guardados en FireBase en la consola
            querySnapshot.forEach(doc => {

                const integranteDato = doc.data();
                integranteDato.id = doc.id;
                if (email == integranteDato.emailCliente) {
                    window.location = "./index.html";
                } else {
                    window.location = "./registro.html";
                }
            })
        });
    });
}*/