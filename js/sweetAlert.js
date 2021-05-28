function clicEliminar() {
    Swal.fire({
        title: 'Estas seguro que deseas eliminar este producto  ?',
        text: "El proceso no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        //width: '20%',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar.'

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado',
                'El producto ha sido eliminado',
                'success'
            )
        }
    });
}

function esperar() {
    let timerInterval
    Swal.fire({
        title: 'Cargando datos del producto',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
            location.href = 'index.html'
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Finalizado.')
        }
    });
}

function agregarProducto() {

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu producto ha sido publicado',
        showConfirmButton: false,
        timer: 1500
    }).then(function() {
        window.location = "index.html";
    });
}

function solicitarDevolucion() {
    Swal.fire({
        title: 'Estas a punto de enviar la solicitud de devolución',
        text: "El proceso demora hasta tres dias",
        icon: 'question',
        showCancelButton: true,
        //width: '20%',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, enviar'

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Enviada',
                'Tu solicitud fue enviada',
                'success'
            ).then(function() {
                window.location = "index.html";
            });
        }
    });
}

function tarjetaAgregada() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Método de pago agregado',
        showConfirmButton: false,
        timer: 1500
    }).then(function() {
        window.location = "index.html";
    });

}


function procederPagoEfectivo() {
    Swal.fire({
        title: 'Pago en efectivo',
        text: "Estoy consciente sobre la garantia de mi producto al realizar el pago en efectivo.",
        icon: 'warning',
        showCancelButton: true,
        //width: '20%',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, proceder.'

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Generado',
                'Tu linea de captura fue generada',
                'success'
            )
        }
    });
}