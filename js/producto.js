const db = firebase.firestore();

var produ = document.getElementById('infop');
var spec = document.getElementById('specifications');
var rev = document.getElementById('reviews');
var rec = document.getElementById('recom');
var come = document.getElementById('come');

var getNombrep = localStorage.getItem("nombre_variable");
var getCat = localStorage.getItem("cat_variable");
var getId = localStorage.getItem("id_variable");
let id = '';

db.settings({timestampsInSpanshots: true});
//console.log(getNombrep);
//console.log(getId);
//window.onload = alert(localStorage.getItem("nombre_variable");

db.collection("producto").where("nombre_prod", "==",  getNombrep, true).get().then((querySnapshot) => { 
    produ.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const infoD = doc.data()
            //console.log(`${doc.comentarios} => ${doc.data()}`);
            produ.innerHTML += `
            <div id="infop" class="product-info">
                <div class="row"> 
                    <div class="col-md-6">
                        <div class="gallery">
                            <div id="product-preview" class="vanilla-zoom">
                                    <img class="img-fluid d-block small-preview" src="${infoD.url_prod}"> 
                            </div>                      
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info">
                            <div class="nameP">
                                <h3>${infoD.nombre_prod}</h3>
                            </div>
                            <div class="calificacion">
                                <h5>Calificación: ${infoD.calif_prod} /10</h5>
                            </div>
                            <div class="disponible">
                                <h5>Cant. Disponible: ${infoD.cant_prod}</h5>
                            </div>
                            <div class="price">
                                <h3>$ ${infoD.prec_prod}</h3>
                            </div>
                            <div class="col-6 col-md-2 quantity">
                                <label class="form-label d-none d-md-block" for="quantity">Cantidad
                                </label>
                                <input type="number"  class="form-control quantity-input" valor min="1" max="${infoD.cant_prod}" value="1">
                            </div>
                            <br>
                            <div>
                                <button class="btn btn-primary btn-add" onclick="hizoClick()" type="button" style="background: rgb(13,136,208);" >
                                Añadir Carrito
                                </button>
                            </div>
                            <div align="justify" class="summary">
                                <p>${infoD.desc_prod}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        });
    });
//<button data-id="' + infoDato.id + '"class="btn btn-primary btn-add" type="button" style="background: rgb(13,136,208);">Añadir Carrito</button>
//<button id="aña" class="btn btn-primary btn-add"  type="button" style="background: rgb(13,136,208);"><i class="icon-basket"></i>Añadir al carrito</button></a>

function hizoClick() {
    alert("Enviado");
    db.collection("carrito").doc().set({
        idCliente: "pruebaid" ,
            infoProducto: { 
            cant_prod: 1,
            cond_prod: "Usado",
            idProducto: getId,
            url_prod: "https://detqhtv6m6lzl.cloudfront.net/wp-content/uploads/2020/08/7501147413249.jpg",
            nombre_prod: getNombrep,
            prec_prod: 1,
            desc_prod: "prueba",
            cat_prod: getCat,
            cant_prod_car: 1,
            }
        
    })
  }



















/*db.collection("carrito").doc().set({
    cant_prod: 1,
    cond_prod: "Usado",
    idProducto: "4qa7PBd5Njb4pVBg3fQ6",
    url_prod: "https://detqhtv6m6lzl.cloudfront.net/wp-content/uploads/2020/08/7501147413249.jpg",
    nombre_prod: "prueba",
    prec_prod: 1,
    desc_prod: "prueba",
    cat_prod: "prueba",
    cant_prod_car: 1

})*/


/*const taskform = document.getElementById('aña');

taskform.addEventListener('submit',e=>{
    e.preventDefault();
    console.log('submiting')
})
*/


const col = db.collection('producto');
const query = col.where('specs', 'array-contains',getNombrep)
spec.innerHTML = '';
query.get().then(snapshot =>{
    snapshot.docs.forEach(doc =>{
    const infoD = doc.data()
    //console.log(doc.id,doc.data())
    spec.innerHTML += `
        <div class="table-responsive">
            <table class="table table-bordered">
                <tbody>
                    <tr><td> ${infoD.specs[0]}</td></tr>
                    <tr><td> ${infoD.specs[1]}</td></tr>
                    <tr><td> ${infoD.specs[2]}</td></tr>
                    <tr><td> ${infoD.specs[3]}</td></tr>
                    <tr><td> ${infoD.specs[4]}</td></tr>
                    <tr><td> ${infoD.specs[5]}</td></tr>
                    <tr><td> ${infoD.specs[6]}</td></tr>
                </tbody>
            </table>
        </div>`
    })
})

const col2 = db.collection('comentarios');
const query2 = col2.where('comentario', 'array-contains',getNombrep)
rev.innerHTML = '';
query2.get().then(snapshot =>{
    snapshot.docs.forEach(doc =>{
    const infoD = doc.data()
    //console.log(doc.id,doc.data())
    rev.innerHTML += `
        <div class="reviews">
            <div class="review-item">
                <h4>${infoD.comentario[3]}&nbsp;</h4>
                <span class="text-muted"><a href="#">${infoD.comentario[1]}</a>, ${infoD.comentario[0]}</span>
                <p>${infoD.comentario[2]}</p>
            </div>
        </div>`
    })
})

db.collection("producto").where("cat_prod", "!=", getCat,true).limit(3).get().then((querySnapshot) => {
    rec.innerHTML = '';
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        rec.innerHTML += `
        <div class="col-sm-6 col-lg-4">
            <div class="clean-related-item">
                <div class="image">
                    <a href="#"><img class="img-fluid d-block mx-auto" src="${doc.data().url_prod}"></a>
                </div>
                    <div class="related-name"><a href="#">${doc.data().nombre_prod}</a>
                        <h4>$${doc.data().prec_prod}</h4>
                    </div>
                </div>
            </div>
        </div>`
    });
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

