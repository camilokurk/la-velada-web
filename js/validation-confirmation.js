function validarZona(valor) {
    if (valor === "") {
        return "Selecciona una zona"
    } else {
        return ""
    }
}

function validarEntradas(valor) {
    const numero = Number(valor)
    if (Number.isInteger(numero) && numero <= 4 && numero >= 1) {
        return ""
    } else {
        return "Elige entre 1 y 4 entradas"
    }
}

function validarNombre(valor) {
    const limpio = valor.trim()
    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/
    if (limpio === "") {
        return "Este campo es obligatorio"
    } else if (limpio.length < 2 || limpio.length > 100) {
        return "Debe contener entre 2 y 100 caracteres"
    } else if (!soloLetras.test(limpio)) {
        return "Solo se admiten letras, espacios, guiones y apóstrofos"
    } else {
        return ""
    }
}

function validarCorreo(valor) {
    const limpio = valor.trim()
    const caracteres = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (limpio === "") {
        return "Este campo es obligatorio"
    } else if (!caracteres.test(limpio)) {
        return "Introduce un correo válido, por ejemplo nombre@dominio.com"
    } else {
        return ""
    }
}

function validarTelefono(valor) {
    const limpio = valor.trim().replace(/\s/g, "")
    const telefono = /^[6-9]\d{8}$/
    if (limpio === "") {
        return "Este campo es obligatorio"
    } else if (!telefono.test(limpio)) {
        return "Introduce un teléfono de 9 dígitos que empiece por 6, 7, 8 o 9"
    } else {
        return ""
    }
}

function validarNacimiento(valor) {
    if (valor === "") {
        return "Indica tu fecha de nacimiento"
    }
    const nacimiento = new Date(valor)
    const hoy = new Date()
    if (Number.isNaN(nacimiento.getTime()) || nacimiento > hoy) {
        return "Introduce una fecha válida que no sea futura"
    }
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const aunNoCumple = hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
    if (aunNoCumple) {
        edad--
    }
    if (edad > 120) {
        return "Introduce una fecha válida"
    }
    if (edad < 18) {
        return "Debes ser mayor de 18 años para comprar entradas"
    }
    return ""
}

function validarCondiciones(marcado) {
    if (!marcado) {
        return "Debes aceptar las condiciones de compra"
    } else {
        return ""
    }
}

function mostrarError(campo, mensaje) {
    const spanError = document.getElementById(campo.id + "-error")
    spanError.textContent = mensaje
    if (mensaje === "") {
        campo.removeAttribute("aria-invalid")
        return true
    }
    campo.setAttribute("aria-invalid", "true")
    return false
}

function mostrarConfirmacion(datos) {
    const confirmacion = document.getElementById("confirmation")
    confirmacion.textContent = ""

    const titulo = document.createElement("h2")
    titulo.textContent = "¡Compra realizada!"

    const mensaje = document.createElement("p")
    mensaje.textContent = "Gracias, " + datos.nombre + ". Te enviaremos la confirmación a " + datos.correo + "."    

    confirmacion.appendChild(titulo)
    confirmacion.appendChild(mensaje)

    confirmacion.setAttribute("tabindex", "-1")
    confirmacion.hidden = false
    confirmacion.focus()
}

function iniciarValidacion() {

    const zone = document.getElementById("zone")
    const quantity = document.getElementById("quantity")
    const firstName = document.getElementById("first-name")
    const lastName = document.getElementById("last-name")
    const email = document.getElementById("email")
    const phone = document.getElementById("phone")
    const birthdate = document.getElementById("birthdate")
    const terms = document.getElementById("terms")
    const ticketForm = document.getElementById("ticket-form")

    const campos = [zone, quantity, firstName, lastName, email, phone, birthdate, terms]

    campos.forEach(function (campo) {
        campo.addEventListener("input", function () {
            mostrarError(campo, "")
        })
    })

    ticketForm.addEventListener("submit", validar)

    function validar(event) {
        event.preventDefault()

        const comprobaciones = [
            [zone, validarZona(zone.value)],
            [quantity, validarEntradas(quantity.value)],
            [firstName, validarNombre(firstName.value)],
            [lastName, validarNombre(lastName.value)],
            [email, validarCorreo(email.value)],
            [phone, validarTelefono(phone.value)],
            [birthdate, validarNacimiento(birthdate.value)],
            [terms, validarCondiciones(terms.checked)]
        ]

        let primerError = null
        comprobaciones.forEach(function (par) {
            const valido = mostrarError(par[0], par[1])
            if (!valido && primerError === null) {
                primerError = par[0]
            }
        })

        if (primerError !== null) {
            primerError.focus()
            document.getElementById("confirmation").hidden = true
            return
        }

        mostrarConfirmacion({
            nombre: firstName.value.trim(),
            correo: email.value.trim(),
        })

        mostrarResumen({
            codigo: generarCodigoReserva(),
            zona: zone.options[zone.selectedIndex].text,
            entradas: quantity.value,
            precio: document.getElementById("summary-unit").textContent,
            gastos: document.getElementById("summary-fees").textContent,
            total: document.getElementById("summary-total").textContent,
            fecha: new Date().toLocaleDateString("es-ES")
        })
    }
}

iniciarValidacion()