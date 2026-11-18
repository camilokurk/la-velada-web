function iniciarCalculoPrecio() {
    const GASTOS_POR_ENTRADA = 2

    const zone = document.getElementById("zone")
    const quantity = document.getElementById("quantity")

    const resumenZona = document.getElementById("summary-zone")
    const resumenPrecio = document.getElementById("summary-unit")
    const resumenEntradas = document.getElementById("summary-quantity")
    const resumenGastos = document.getElementById("summary-fees")
    const resumenTotal = document.getElementById("summary-total")

    function formatearEuros(cantidad) {
        return cantidad.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR"
        })
    }

    function calcularPrecio() {
        const opcion = zone.options[zone.selectedIndex]
        const precio = Number(opcion.dataset.price)
        const entradas = Number(quantity.value)

        const entradasValidas = Number.isInteger(entradas) && entradas >= 1 && entradas <= 4
        const hayZona = zone.value !== ""

        let subtotal = 0
        let gastos = 0

        if (hayZona && entradasValidas) {
            subtotal = precio * entradas
            gastos = GASTOS_POR_ENTRADA * entradas
        }

        resumenZona.textContent = hayZona ? opcion.text : "—"
        resumenPrecio.textContent = formatearEuros(hayZona ? precio : 0)
        resumenEntradas.textContent = entradasValidas ? entradas : "—"
        resumenGastos.textContent = formatearEuros(gastos)
        resumenTotal.textContent = formatearEuros(subtotal + gastos)
    }

    zone.addEventListener("change", calcularPrecio)
    quantity.addEventListener("input", calcularPrecio)

    calcularPrecio()
}

iniciarCalculoPrecio()
