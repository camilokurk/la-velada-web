function generarCodigoReserva() {
    const codigo = Math.random().toString(36).slice(2, 8).padEnd(6, "0").toUpperCase()
    return "VEL-" + codigo
}

function mostrarResumen(datos) {
    const conf = document.getElementById("confirmation-summary")

    const titulo = document.createElement("h3")
    titulo.textContent = "Resumen de tu compra"

    const lista = document.createElement("dl")

    const filas = [
        ["Zona", datos.zona],
        ["Entradas", datos.entradas],
        ["Precio por entrada", datos.precio],
        ["Gastos de gestión", datos.gastos],
        ["Total", datos.total],
        ["Fecha", datos.fecha]
    ]

    filas.forEach(function (par) {
        const dt = document.createElement("dt")
        dt.textContent = par[0]
        const dd = document.createElement("dd")
        dd.textContent = par[1]
        lista.appendChild(dt)
        lista.appendChild(dd)
    })

    const codigo = document.createElement("p")
    codigo.textContent = "Código de reserva: "
    const codigoDestacado = document.createElement("strong")
    codigoDestacado.textContent = datos.codigo
    codigo.appendChild(codigoDestacado)

    // Descarga del PDF pendiente: el botón queda deshabilitado
    const descarga = document.createElement("button")
    descarga.type = "button"
    descarga.id = "download-pdf"
    descarga.disabled = true
    descarga.textContent = "Descargar PDF"

    conf.appendChild(titulo)
    conf.appendChild(lista)
    conf.appendChild(codigo)
    conf.appendChild(descarga)
}
