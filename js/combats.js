function buscarLuchador(id) {
    return datosLuchadores.find(function (l) {
        return l.id === id
    })
}

function crearLuchador(luchador) {
    const bloque = document.createElement("div")

    const foto = document.createElement("img")
    foto.src = luchador.foto
    foto.alt = luchador.nombre

    const nombre = document.createElement("h3")
    nombre.textContent = luchador.nombre

    const datos = document.createElement("ul")
    const filas = [
        "Edad: " + luchador.edad + " años",
        "Altura: " + luchador.altura + " cm",
        "Peso: " + luchador.peso + " kg"
    ]
    filas.forEach(function (texto) {
        const li = document.createElement("li")
        li.textContent = texto
        datos.appendChild(li)
    })

    bloque.appendChild(foto)
    bloque.appendChild(nombre)
    bloque.appendChild(datos)
    return bloque
}

function crearCombate(combate) {
    const ficha = document.createElement("article")
    const luchador1 = buscarLuchador(combate.luchador1)
    const luchador2 = buscarLuchador(combate.luchador2) 
    const VS = document.createElement("span")
    VS.textContent = "VS"
    const tipo_combate = document.createElement("p")
    tipo_combate.textContent = combate.tipo
    ficha.appendChild(crearLuchador(luchador1))
    ficha.appendChild(VS)
    ficha.appendChild(crearLuchador(luchador2))
    ficha.appendChild(tipo_combate)
    return ficha
}   

function mostrarCombates() {
    const lista = document.getElementById("combats-list")
    combates.forEach(combate => {
        lista.appendChild(crearCombate(combate))
    });
    // recorre combates con forEach y por cada uno:
    //   lista.appendChild(crearCombate(combate))
}

mostrarCombates()