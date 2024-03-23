
enum Color{
    Blanco = "Blanco",
    Azul = " Azul",
    Negro = "Negro",
    Rojo = "Rojo",
    Verde = "Verde",
    Incoloro = "Incoloro",
    Multicolor = "Multicolor"
}
enum Tipo{
    Tierra = "Tierra",
    Criatura = "Criatura",
    Encantamiento = "Encantamiento",
    Conjuro = "Conjuro",
    Instantaneo = "Instantaneo",
    Artefacto = "Artefacto",
    Planeswalker = "Planeswalker"
}
enum Rareza{
    Comun = "Comun",
    Infrecuente = "Infrecuente",
    Rara = "Rara",
    Mitica = "Mitica"
}
interface ReferenciaCarta{
    id: number, 
    nombre: string,
    coste_mana: number,
    color: Color,
    linea_tipo: Tipo,
    rareza: Rareza,
    texto_reglas: string, 
    fuerza_resistencia?: number, //sólo se incluyen en aquellas cartas de tipo Criatura
    marcas_lealtad?: number, // Es un valor numérico indicando cuánta lealtad tiene un Planeswalker, por lo que sólo se incluye en dicho tipo de cartas.
    valor_mercado: number
}

class MagicCards{
    constructor()
}