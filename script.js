

$("#btn-cargar-solicitudes").on("click", function (event) {
    // Empty container
    $("#container-solicitudes").empty();

    $.ajax({
        type: "GET",
        url: "http://192.168.16.90:8000/api/solicitudes",
        success: function (response) {

            let cardTemplate = ''

            $(response.data).each(function (index, data) {

                let link_whatsapp = 'whatsapp://send?text=*SOLICITUD DONACIÓN DE SANGRE*\n' +
                    `Nombre Donatario: ${data.nombre_apellido_donatario}\n` +
                    `Teléfono: ${data.telefono_contacto}\n` +
                    `C.I: ${data.cedula_donatario}\n` +
                    `Lugar donación: ${data.establecimiento}\n` +
                    `RH: ${data.tipo_sangre}\n` +
                    `Volumenes Necesarios: ${data.volumenes_necesarios}\n` +
                    `Fecha Limite: ${data.fecha_limite}\n` +
                    `Solicitud: ${data.solicitud}\n` +
                    `Link: http://localhost:5500/index.html\n`

                link_whatsapp = link_whatsapp.replaceAll(' ', '%20')
                link_whatsapp = link_whatsapp.replaceAll('\n', '%0a')


                cardTemplate = `<div class="col d-flex align-items-stretch">
            <div class="card mb-4 rounded-4 shadow w-100">
                <div class="card-header py-3 bg-white d-flex justify-content-between align-items-center rounded-top-4">
                    <h4 id="nombre-donatario" class="text-start">${data.nombre_apellido_donatario}</h4>
                    <div class="fs-5">
                        <a href="javascript:void(0)" class="link-dark" data-bs-toggle="tooltip" data-bs-title="Eliminar"><i class="bi bi-trash"></i></a>
                        <a href="${link_whatsapp}" class="link-danger" data-bs-toggle="tooltip" data-bs-title="Compartir en whatsapp"><i class="bi bi-share"></i></a>
                    </div>
                </div>
                <div class="card-body text-start">
                    <p class="d-flex justify-content-between">
                        Teléfono
                        <span id="telefono">${data.telefono_contacto}</span>
                    </p>
                    <p class="d-flex justify-content-between">
                        C.I:
                        <span id="telefono">${data.cedula_donatario}</span>
                    </p>
                    <p class="d-flex justify-content-between">
                        Lugar de donación
                        <span id="telefono">${data.establecimiento}</span>
                    </p>
                    <p class="d-flex justify-content-between">
                        RH:
                        <span id="telefono">${data.tipo_sangre}</span>
                    </p>
                    <p class="d-flex justify-content-between">
                        Volúmenes
                        <span id="telefono">${data.volumenes_necesarios}</span>
                    </p>
                    <p class="d-flex justify-content-between">
                        Fecha Limite
                        <span id="telefono">${data.fecha_limite}</span>
                    </p>
                </div>
                <div class="card-footer ">
                    <span id="solicitud" class="fs-5">${data.solicitud}</span>
                </div>
            </div>
        </div>`

                $("#container-solicitudes").append(cardTemplate);
            })
            // End foreach
            enableTooltips()
        }
    })
});

function enableTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

