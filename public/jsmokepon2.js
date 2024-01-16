const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMokeponJugador = document.getElementById('boton-mokepon-jugador')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMokepon = document.getElementById('seleccionar-mokepon')

const spanMokeponJugador = document.getElementById('mokepon-jugador')
const spanMokeponEnemigo = document.getElementById('mokepon-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetasMokepon = document.getElementById('contenedor-tarjetas-mokepon')
const contenedorAtaques = document.getElementById('contenedor-ataques-mokepon')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueMokeponJugador = []
let ataqueMokeponEnemigo = []
let opcionDeMokepones
let inputHipodogue 
let inputCapipepo 
let inputRatigueya 
let mokeponJugador
let mokeponJugadorObjeto
let ataquesMokepon
let botonFuego 
let botonAgua 
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './imagenes/mokemapa.webp'
let altoDeMapa 
let anchoDeMapa = window.innerWidth - 50
const anchoMaximoMapa = 800

if (anchoDeMapa > anchoMaximoMapa) {
    anchoDeMapa = anchoMaximoMapa - 50
}

altoDeMapa = anchoDeMapa * 600 / 800

mapa.width = anchoDeMapa
mapa.height = altoDeMapa

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id=null ) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Hipodogue = new Mokepon('Hipodogue', './imagenes/mokefuego.jpg', 5, './fondo/mokefuego.jpg')
let Capipepo = new Mokepon('Capipepo', './imagenes/mokeagua.png', 5, './fondo/mokeagua.png')
let Ratigueya = new Mokepon('Ratigueya', './imagenes/moketierra.webp', 5, './fondo/moketierra.webp')

const ataquesHipodogue = [
    { nombre: 'FUEGO', id: 'boton-fuego' },
    { nombre: 'FUEGO', id: 'boton-fuego' },
    { nombre: 'FUEGO', id: 'boton-fuego' },
    { nombre: 'AGUA', id: 'boton-agua' },
    { nombre: 'TIERRA', id: 'boton-tierra' }
]

Hipodogue.ataques.push(...ataquesHipodogue)

const ataquesCapipepo = [
    { nombre: 'AGUA', id: 'boton-agua' },
    { nombre: 'AGUA', id: 'boton-agua' },
    { nombre: 'AGUA', id: 'boton-agua' },
    { nombre: 'FUEGO', id: 'boton-fuego' },
    { nombre: 'TIERRA', id: 'boton-tierra' }
]

Capipepo.ataques.push(...ataquesCapipepo)

const ataquesRatigueya = [
    { nombre: 'TIERRA', id: 'boton-tierra' },
    { nombre: 'TIERRA', id: 'boton-tierra' },
    { nombre: 'TIERRA', id: 'boton-tierra' },
    { nombre: 'FUEGO', id: 'boton-fuego' },
    { nombre: 'AGUA', id: 'boton-agua' }
]

Ratigueya.ataques.push(...ataquesRatigueya)

mokepones.push(Hipodogue,Capipepo,Ratigueya)

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mokepon" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img Src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetasMokepon.innerHTML += opcionDeMokepones

    inputHipodogue = document.getElementById('Hipodogue')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMokeponJugador.addEventListener('click', seleccionarMokeponJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()

}

function unirseAlJuego() {

    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if(res.ok) {
                res.text()
                .then(function(respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
            }
        })
}

function seleccionarMokeponJugador() {
    
    if (inputHipodogue.checked) {
        spanMokeponJugador.innerHTML = inputHipodogue.id
        mokeponJugador = inputHipodogue.id
    } else if (inputCapipepo.checked) {
        spanMokeponJugador.innerHTML = inputCapipepo.id
        mokeponJugador = inputCapipepo.id
    } else if(inputRatigueya.checked) {
        spanMokeponJugador.innerHTML = inputRatigueya.id
        mokeponJugador = inputRatigueya.id
    } else {
        alert('selecciona un mokepon')
        return
    }

    sectionSeleccionarMokepon.style.display = 'none'

    seleccionarMokepon(mokeponJugador)

    extraerAtaques(mokeponJugador)

    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mokeponJugador) {

    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mokeponJugador
        })
    })
}

function extraerAtaques(mokeponJugador) {

    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques 
        }
    }  
    mostrarAtaques(ataques)
}  

function mostrarAtaques(ataques) {

    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque () {

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === 'FUEGO') {
                ataqueMokeponJugador.push('FUEGO')
                console.log(ataqueMokeponJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === 'AGUA') {
                ataqueMokeponJugador.push('AGUA')
                console.log(ataqueMokeponJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueMokeponJugador.push('TIERRA')
                console.log(ataqueMokeponJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueMokeponJugador.length === 5 ) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueMokeponJugador

        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ ataques }) {
                    if (ataques.length === 5) {
                        ataqueMokeponEnemigo = ataques
                        COMBATE()
                    }
                })
        }
    })
}

function seleccionarMascotaEnemigo(enemigo) {
   
    spanMokeponEnemigo.innerHTML = enemigo.nombre
    ataqueMokeponEnemigo = enemigo.ataques

    secuenciaAtaque ()
}

function ataqueAleatorioEnemigo() {

    console.log('Ataques enemigo',ataqueMokeponEnemigo)
    let ataqueAleatorio = aleatorio(0, ataqueMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueMokeponEnemigo.push('FUEGO')
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueMokeponEnemigo.push('AGUA')
    } else {
        ataqueMokeponEnemigo.push('TIERRA')
    }
    console.log(ataqueMokeponEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueMokeponJugador.length === 5) {
        COMBATE()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueMokeponJugador[jugador]
    indexAtaqueEnemigo = ataqueMokeponEnemigo[enemigo]
}

function COMBATE() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueMokeponJugador.length; index++) {
        console.log(ataqueMokeponJugador[index])
        console.log(ataqueMokeponEnemigo[index])
        if (ataqueMokeponJugador[index] === ataqueMokeponEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearmensaje("EMPATE")
        } else if (ataqueMokeponJugador[index] ==='FUEGO' && ataqueMokeponEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearmensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueMokeponJugador[index] ==='AGUA' && ataqueMokeponEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearmensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueMokeponJugador[index] ==='TIERRA' && ataqueMokeponEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index)
            crearmensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearmensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }  
    }
    RevisarVidas()
}
  
function RevisarVidas() {
    console.log("LAS VICTORIAS DEL JUGADOR SON", victoriasJugador)
    console.log("LAS VICTORIAS DEL ENEMIGO SON", victoriasEnemigo)
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("ES UN EMPATE")
    } else if(victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("VICTORIA GUERRERO")
    } else {
        crearMensajeFinal("APLASTANTE DERROTA")
    }
}

function crearmensaje(resultado) {
 
    let nuevoAtaqueDelJugador =  document.createElement('p')
    let nuevoAtaqueDelEnemigo =  document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    console.log(indexAtaqueJugador)
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mokeponJugadorObjeto.x = mokeponJugadorObjeto.x + mokeponJugadorObjeto.velocidadX
    mokeponJugadorObjeto.y = mokeponJugadorObjeto.y + mokeponJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokeponJugadorObjeto.pintarMokepon()

    enviarPosicion(mokeponJugadorObjeto.x, mokeponJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        if(mokepon != undefined) {
            mokepon.pintarMokepon()
        revisarColision(mokepon)
        }
    })  
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if(res.ok) {
            res.json()
            .then(function ({ enemigos }) {
                console.log(enemigos)
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null
                    if(enemigo.mokepon != undefined) {
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                    if (mokeponNombre === "Hipodogue") {
                        mokeponEnemigo = new Mokepon('Hipodogue', './imagenes/mokefuego.jpg', 5, './fondo/mokefuego.jpg', enemigo.id)
                    } else if (mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon('Capipepo', './imagenes/mokeagua.png', 5, './fondo/mokeagua.png', enemigo.id)
                    } else if (mokeponNombre === "Ratigueya") {
                        mokeponEnemigo = new Mokepon('Ratigueya', './imagenes/moketierra.webp', 5, './fondo/moketierra.webp', enemigo.id)
                    }
                     mokeponEnemigo.x = enemigo.x
                     mokeponEnemigo.y = enemigo.y

                     return mokeponEnemigo
                    }
                })
            }
        )}   
    })
}

function moverArriba() {
    mokeponJugadorObjeto.velocidadY = -5

}
function moverIzquierda() {
    mokeponJugadorObjeto.velocidadX = -5

}
function moverAbajo() {
    mokeponJugadorObjeto.velocidadY = 5

}
function moverDerecha() {
    mokeponJugadorObjeto.velocidadX = 5
}

function detenerMovimiento() {
    mokeponJugadorObjeto.velocidadX = 0
    mokeponJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {

    mokeponJugadorObjeto = obtenerObjetoMascota(mokeponJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', teclaPresionada)

    window.addEventListener('keyup', detenerMovimiento)

}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }  
}

function revisarColision(enemigo) {

    const arribaMokepon = mokeponJugadorObjeto.y
    const abajoMokepon = mokeponJugadorObjeto.y + mokeponJugadorObjeto.alto
    const derechaMokepon = mokeponJugadorObjeto.x + mokeponJugadorObjeto.ancho
    const izquierdaMokepon = mokeponJugadorObjeto.x

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    if (
        abajoMokepon < arribaEnemigo ||
        arribaMokepon > abajoEnemigo ||
        derechaMokepon < izquierdaEnemigo ||
        izquierdaMokepon > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    alert("NUEVA BATALLA CON " + enemigo.nombre)
    enemigoId = enemigo.id

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)



