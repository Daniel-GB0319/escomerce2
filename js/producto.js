const db = firebase.firestore();
var produ = document.getElementById('infop');
var pd = localStorage.getItem("nombre_variable");
console.log(pd);
//window.onload = alert(localStorage.getItem("nombre_variable");
db.collection("producto").where("nombre_prod", "==",  pd, true).get().then((querySnapshot) => {
    produ.innerHTML = '';
    querySnapshot.forEach((doc) => {
     //  console.log(`${doc.id} => ${doc.data()}`);
        produ.innerHTML += `
       <div class="d-flex block-heading" style="width: 100vw;"><button class="btn btn-primary" type="button" style="background: rgb(13,136,208);">Regresar</button></div>
       <div class="block-content" >
           <div class="product-info">
               <div class="row">
                   <div class="col-md-6">
                       <div class="gallery">
                           <div id="product-preview" class="vanilla-zoom">
                               <img class="img-fluid d-block small-preview" src="${doc.data().url_prod}">                        
                           </div>
                       </div>
                   </div>
                   <div class="col-md-6">
                       <div class="info">
                           <div class="nameP">
                               <h3>${doc.data().nombre_prod}</h3>
                           </div>
                           <div class="calificacion">
                           <h5>Calificación: ${doc.data().calif_prod} /10</h5>
                            </div>
                            <div class="disponible">
                            <h5>Cant. Disponible: ${doc.data().cant_prod}</h5>
                             </div>
                           <div class="price">
                               <h3>$ ${doc.data().prec_prod}</h3>
                           </div>
                           <div class="col-6 col-md-2 quantity"><label class="form-label d-none d-md-block" for="quantity">Cantidad</label><input type="number" id="number" class="form-control quantity-input" value="1"></div>
                           <br>
                           <a href="carrito.html">
                           <button class="btn btn-primary" type="button" style="background: rgb(13,136,208);">
                           <i class="icon-basket"></i>
                           Añadir al carrito
                           </button>
                            </a>
                           <div class="summary">
                               <p>${doc.data().desc_prod}.</p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>

           <div class="product-info">
               <div>
                   <ul class="nav nav-tabs" role="tablist" id="myTab">
                       <li class="nav-item" role="presentation"><a class="nav-link" role="tab" data-bs-toggle="tab" id="specifications-tabs" href="#specifications">Especificaciones</a></li>
                       <li class="nav-item" role="presentation"><a class="nav-link active" role="tab" data-bs-toggle="tab" id="reviews-tab" href="#reviews">Comentarios del producto</a></li>
                   </ul>
                   <div class="tab-content" id="myTabContent">
                       <div class="tab-pane fade specifications" role="tabpanel" id="specifications">
                           <div class="table-responsive">
                               <table class="table table-bordered">
                                   <tbody>
                                       <tr>
                                           <td> ${doc.data().spec1}</td>
                                       </tr>
                                       <tr>
                                           <td> ${doc.data().spec2}</td>
                                       </tr>
                                       <tr>
                                           <td> ${doc.data().spec3}</td>
                                       </tr>

                                       <tr>
                                           <td> ${doc.data().spec4}</td>
                                       </tr>
                                       <tr>
                                           <td> ${doc.data().spec5}</td>
                                       </tr>
                                       <tr>
                                           <td> ${doc.data().spec6}</td>
                                       </tr>
                                       <tr>
                                           <td> ${doc.data().spec7}</td>
                                       </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="tab-pane fade show active" role="tabpanel" id="reviews">
                           <div class="reviews">
                               <div class="review-item">
                                   <div class="d-none rating"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star-empty.svg"></div>
                                   <h4>${doc.data().titulo_coment}</h4><span class="text-muted"><a href="#">${doc.data().nom_vendedor}</a>, ${doc.data().fecha_coment}</span>
                                   <p>${doc.data().coment}</p>
                               </div>
                           </div>
                           <div class="reviews">
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div> 
   
   <div class="clean-related-items">
   <h3>Te podría interesar<br></h3>
   <div class="items">
       <div class="row justify-content-center">
           <div class="col-sm-6 col-lg-4">
               <div class="clean-related-item">
                   <div class="image">
                       <a href="#"><img class="img-fluid d-block mx-auto" src="assets/img/subirImagen.png"></a>
                   </div>
                   <div class="related-name"><a href="#">Nombre producto</a>
                       <div class="d-none rating"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star.svg"><img src="assets/img/star-half-empty.svg"><img src="assets/img/star-empty.svg"></div>
                       <h4>$300</h4>
                   </div>
               </div>
           </div>
          `

    });
});




