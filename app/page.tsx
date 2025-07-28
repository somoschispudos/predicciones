"use client"

import { useState, useEffect } from "react"
import { Star, Sparkles, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CosmicNumber {
  number: string
  explanation: string
  constellation: string
}

export default function GeneradorApuestasCosmica() {
  const [numerosCosmicos, setNumerosCosmicos] = useState<CosmicNumber[]>([])
  const [contadorVisitantes, setContadorVisitantes] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [mostrarAnimacion, setMostrarAnimacion] = useState(false)

  // Generar número aleatorio basado en semilla de fecha
  const aleatorioConSemilla = (semilla: number) => {
    const x = Math.sin(semilla) * 10000
    return x - Math.floor(x)
  }

  // Generar números diarios basados en la fecha actual
  const generarNumerosDiarios = () => {
    const hoy = new Date()
    const fechaString = hoy.toISOString().split("T")[0] // YYYY-MM-DD
    const semilla = fechaString.split("-").reduce((acc, val) => acc + Number.parseInt(val), 0)

    const numeros: number[] = []
    let semillaActual = semilla

    // Generar 3 números únicos
    while (numeros.length < 3) {
      semillaActual += 1
      const valorAleatorio = aleatorioConSemilla(semillaActual)
      const numero = Math.floor(valorAleatorio * 99) + 1

      if (!numeros.includes(numero)) {
        numeros.push(numero)
      }
    }

    const constelaciones = [
      "Mercurio",
      "Venus",
      "Marte",
      "Júpiter",
      "Saturno",
      "Neptuno",
      "Urano",
      "Plutón",
      "Orión",
      "Casiopea",
      "Draco",
      "Andrómeda",
      "Perseo",
      "Lira",
      "Cisne",
    ]

    const explicaciones = [
      "alineándose con la Luna bendice este número con fortuna interestelar",
      "danzando a través de los vientos cósmicos trae energía mística a este dígito",
      "susurrando secretos ancestrales a través del vacío estelar empodera este número",
      "proyectando luz etérea sobre este número desde galaxias distantes",
      "canalizando vibraciones cósmicas a través del plano astral para este dígito afortunado",
      "tejiendo magia de luz estelar alrededor de este número durante la danza celestial de hoy",
      "enviando bendiciones cósmicas a través del campo cuántico a este número especial",
      "iluminando este número con el poder de mil estrellas fugaces",
      "armonizando con frecuencias universales para cargar este número con suerte",
      "abriendo portales de fortuna a través de fisuras dimensionales para este dígito místico",
    ]

    return numeros.map((num, index) => ({
      number: num.toString().padStart(2, "0"),
      constellation: constelaciones[(aleatorioConSemilla(semilla + index + 100) * constelaciones.length) | 0],
      explanation: explicaciones[(aleatorioConSemilla(semilla + index + 200) * explicaciones.length) | 0],
    }))
  }

  // Inicializar contador de visitantes
  useEffect(() => {
    // Simular seguimiento de visitantes con localStorage
    const hoy = new Date().toISOString().split("T")[0]
    const ultimaVisita = localStorage.getItem("ultimaVisita")
    const conteoActual = Number.parseInt(localStorage.getItem("contadorVisitantes") || "1247")

    if (ultimaVisita !== hoy) {
      const nuevoConteo = conteoActual + Math.floor(Math.random() * 3) + 1
      localStorage.setItem("contadorVisitantes", nuevoConteo.toString())
      localStorage.setItem("ultimaVisita", hoy)
      setContadorVisitantes(nuevoConteo)
    } else {
      setContadorVisitantes(conteoActual)
    }

    // Generar números y mostrar animación de carga
    setTimeout(() => {
      setNumerosCosmicos(generarNumerosDiarios())
      setCargando(false)
    }, 2000)
  }, [])

  const manejarRedibujo = () => {
    setMostrarAnimacion(true)
    setTimeout(() => {
      setNumerosCosmicos(generarNumerosDiarios())
      setMostrarAnimacion(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Estrellas Animadas de Fondo */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Estrellas Fugaces */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: "rotate(45deg)",
              animationDelay: `${i * 2}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-yellow-300 mr-2 animate-spin" style={{ animationDuration: "8s" }} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
              Números Mágicos Diarios
            </h1>
            <Star className="w-8 h-8 text-yellow-300 ml-2 animate-spin" style={{ animationDuration: "8s" }} />
          </div>
          <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto">
            Descubre tus números astronómicos diarios, bendecidos por alineaciones celestiales y energía cósmica
          </p>
          <div className="flex items-center justify-center mt-4 text-purple-300">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Alineación cósmica de hoy:{" "}
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <Sparkles className="w-4 h-4 ml-2" />
          </div>
        </div>

        {/* Estado de Carga */}
        {cargando && (
          <div className="text-center mb-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-300 border-t-transparent mb-4"></div>
            <p className="text-purple-200 text-lg">Consultando las fuerzas cósmicas...</p>
          </div>
        )}

        {/* Números Cósmicos */}
        {!cargando && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {numerosCosmicos.map((cosmico, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br from-purple-800/50 to-pink-800/50 border-purple-400/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${mostrarAnimacion ? "animate-pulse" : ""}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text mb-2">
                      {cosmico.number}
                    </div>
                    <div className="flex items-center justify-center text-purple-300 mb-4">
                      <Moon className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{cosmico.constellation}</span>
                      <Sun className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    <span className="font-semibold text-yellow-300">{cosmico.constellation}</span> {cosmico.explanation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Botón de Redibujo */}
        {!cargando && (
          <div className="text-center mb-12">
            <Button
              onClick={manejarRedibujo}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={mostrarAnimacion}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {mostrarAnimacion ? "Realineando Estrellas..." : "Consultar las Estrellas de Nuevo"}
            </Button>
            <p className="text-purple-300 text-sm mt-2">{"✨ Los números permanecen cósmicamente fijos para hoy ✨"}</p>
          </div>
        )}

        {/* Contador de Visitantes */}
        <div className="text-center mb-8">
          <div className="inline-block bg-purple-800/30 backdrop-blur-sm rounded-full px-6 py-2 border border-purple-400/30">
            <span className="text-purple-200 text-sm">
              🌟 {contadorVisitantes.toLocaleString()} buscadores cósmicos han visitado hoy
            </span>
          </div>
        </div>

        {/* Información de Números de Sueños */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="bg-gradient-to-br from-green-800/30 to-purple-800/30 border-green-400/30 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <Moon className="w-12 h-12 text-green-300 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-green-200 mb-2">✨ Números Basados en Tus Sueños ✨</h3>
              </div>
              <p className="text-green-100 mb-4 leading-relaxed">
                ¿Quieres números personalizados interpretados desde tus sueños más profundos? Nuestros expertos en
                onirología cósmica pueden descifrar los mensajes ocultos de tu subconsciente.
              </p>
              <div className="bg-green-900/40 rounded-lg p-4 border border-green-400/20">
                <p className="text-green-200 text-sm mb-3">📱 Contáctanos por WhatsApp:</p>
                <a
                  href="https://wa.me/50257902460?text=Hola,%20me%20interesa%20recibir%20números%20basados%20en%20mis%20sueños"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.251" />
                  </svg>
                  Escribir por WhatsApp
                </a>
              </div>
              <p className="text-green-300 text-xs mt-3">🌙 Servicio de interpretación onírica personalizada</p>
            </CardContent>
          </Card>
        </div>

        {/* Descargo de Responsabilidad */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-900/20 border-red-400/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start">
                <span className="text-red-400 text-2xl mr-3">⚠️</span>
                <div>
                  <h3 className="text-red-300 font-semibold mb-2">Descargo de Responsabilidad Importante</h3>
                  <p className="text-red-200 text-sm leading-relaxed">
                    Estos números se generan únicamente con fines de entretenimiento y no representan ninguna forma de
                    predicción real, garantía o consejo profesional. Esta aplicación es puramente para diversión y no
                    debe utilizarse como base para decisiones financieras o actividades de juego. Por favor, juegue de
                    manera responsable y dentro de sus posibilidades.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pie de Página */}
        <div className="text-center mt-12 text-purple-300 text-sm">
          <p>✨ Que las fuerzas cósmicas guíen tu fortuna ✨</p>
        </div>
      </div>
    </div>
  )
}
