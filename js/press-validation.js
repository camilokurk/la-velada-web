function validarNombrePrensa(valor) {
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

function validarCorreoPrensa(valor) {
    const limpio = valor.trim()
    const caracteres = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (limpio === "") {
        return "Este campo es obligatorio"
    } else if (!caracteres.test(limpio)) {
        return "Introduce un correo válido, por ejemplo nombre@medio.com"
    } else {
        return ""
    }
}

function validarTelefonoPrensa(valor) {
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

function validarMedio(valor) {
    const limpio = valor.trim()
    if (limpio === "") {
        return "Indica el nombre de tu medio"
    } else if (limpio.length < 2 || limpio.length > 100) {
        return "Debe contener entre 2 y 100 caracteres"
    } else {
        return ""
    }
}

function validarTipo(valor) {
    if (valor === "") {
        return "Selecciona un tipo de acreditación"
    } else {
        return ""
    }
}

function validarMotivo(valor) {
    const limpio = valor.trim()
    if (limpio === "") {
        return "Este campo es obligatorio"
    } else if (limpio.length < 20) {
        return "Cuéntanos un poco más (mínimo 20 caracteres)"
    } else if (limpio.length > 500) {
        return "Debe tener como máximo 500 caracteres"
    } else {
        return ""
    }
}

function validarCondicionesPrensa(marcada) {
    if (!marcada) {
        return "Debes aceptar las condiciones de acreditación"
    } else {
        return ""
    }
}

function mostrarErrorPrensa(campo, mensaje) {
    const spanError = document.getElementById(campo.id + "-error")
    spanError.textContent = mensaje
    if (mensaje === "") {
        campo.removeAttribute("aria-invalid")
        return
    }
    campo.setAttribute("aria-invalid", "true")
}

function generarCodigoAcreditacion() {
    const numero = Math.floor(10000 + Math.random() * 90000)
    return "PRE-" + numero
}

function mostrarConfirmacionPrensa(datos) {
    const confirmacion = document.getElementById("press-confirmation")
    confirmacion.textContent = ""

    const titulo = document.createElement("h2")
    titulo.textContent = "¡Solicitud enviada!"

    const mensaje = document.createElement("p")
    mensaje.textContent = "Gracias, " + datos.nombre + ". Hemos recibido la solicitud de " + datos.medio + " y te responderemos a " + datos.correo + "."

    const codigoTexto = document.createElement("p")
    codigoTexto.textContent = "Tu código de solicitud:"

    const codigo = document.createElement("strong")
    codigo.textContent = generarCodigoAcreditacion()

    confirmacion.appendChild(titulo)
    confirmacion.appendChild(mensaje)
    confirmacion.appendChild(codigoTexto)
    confirmacion.appendChild(codigo)

    document.getElementById("press-form").hidden = true
    document.querySelector(".press-intro").hidden = true
    confirmacion.hidden = false
    confirmacion.focus()
}

const formularioPrensa = document.getElementById("press-form")

if (formularioPrensa) {
    const reglas = [
        { id: "press-name", validar: validarNombrePrensa },
        { id: "press-surname", validar: validarNombrePrensa },
        { id: "press-email", validar: validarCorreoPrensa },
        { id: "press-phone", validar: validarTelefonoPrensa },
        { id: "press-media", validar: validarMedio },
        { id: "press-type", validar: validarTipo },
        { id: "press-reason", validar: validarMotivo }
    ]

    reglas.forEach(function (regla) {
        const campo = document.getElementById(regla.id)
        campo.addEventListener("input", function () {
            if (campo.getAttribute("aria-invalid") === "true") {
                mostrarErrorPrensa(campo, regla.validar(campo.value))
            }
        })
    })

    formularioPrensa.addEventListener("submit", function (evento) {
        evento.preventDefault()
        let primerError = null

        reglas.forEach(function (regla) {
            const campo = document.getElementById(regla.id)
            const mensaje = regla.validar(campo.value)
            mostrarErrorPrensa(campo, mensaje)
            if (mensaje !== "" && primerError === null) {
                primerError = campo
            }
        })

        const terminos = document.getElementById("press-terms")
        const mensajeTerminos = validarCondicionesPrensa(terminos.checked)
        mostrarErrorPrensa(terminos, mensajeTerminos)
        if (mensajeTerminos !== "" && primerError === null) {
            primerError = terminos
        }

        if (primerError !== null) {
            primerError.focus()
            return
        }

        mostrarConfirmacionPrensa({
            nombre: document.getElementById("press-name").value.trim(),
            medio: document.getElementById("press-media").value.trim(),
            correo: document.getElementById("press-email").value.trim()
        })
    })
}