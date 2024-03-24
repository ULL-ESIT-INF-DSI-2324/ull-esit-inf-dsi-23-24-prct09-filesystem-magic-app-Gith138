/**
 * Enumeración de los colores de las cartas.
 */
export var Color;
(function (Color) {
    Color["Blanco"] = "Blanco";
    Color["Azul"] = "Azul";
    Color["Negro"] = "Negro";
    Color["Rojo"] = "Rojo";
    Color["Verde"] = "Verde";
    Color["Incoloro"] = "Incoloro";
    Color["Multicolor"] = "Multicolor";
})(Color || (Color = {}));
/**
 * Enumeración de los tipos de las cartas.
 */
export var Tipo;
(function (Tipo) {
    Tipo["Tierra"] = "Tierra";
    Tipo["Criatura"] = "Criatura";
    Tipo["Encantamiento"] = "Encantamiento";
    Tipo["Conjuro"] = "Conjuro";
    Tipo["Instantaneo"] = "Instantaneo";
    Tipo["Artefacto"] = "Artefacto";
    Tipo["Planeswalker"] = "Planeswalker";
})(Tipo || (Tipo = {}));
/**
 * Enumeración de las rarezas de las cartas.
 */
export var Rareza;
(function (Rareza) {
    Rareza["Comun"] = "Comun";
    Rareza["Infrecuente"] = "Infrecuente";
    Rareza["Rara"] = "Rara";
    Rareza["Mitica"] = "Mitica";
})(Rareza || (Rareza = {}));
/**
 * Representa una carta del juego.
 */
export class Cartas {
    id;
    nombre;
    coste_mana;
    color;
    tipo;
    rareza;
    texto_reglas;
    valor_mercado;
    fuerza_resistencia;
    marcas_lealtad;
    /**
     * Crea una instancia de la clase Cartas.
     * @param id - El identificador de la carta.
     * @param nombre - El nombre de la carta.
     * @param coste_mana - El coste de mana de la carta.
     * @param color - El color de la carta.
     * @param tipo - El tipo de la carta.
     * @param rareza - La rareza de la carta.
     * @param texto_reglas - El texto de las reglas de la carta.
     * @param valor_mercado - El valor de mercado de la carta.
     * @param fuerza_resistencia - La fuerza y resistencia de la carta (solo para cartas de tipo Criatura).
     * @param marcas_lealtad - Las marcas de lealtad de la carta (solo para cartas de tipo Planeswalker).
     */
    constructor(id, nombre, coste_mana, color, tipo, rareza, texto_reglas, valor_mercado, fuerza_resistencia, marcas_lealtad) {
        this.id = id;
        this.nombre = nombre;
        this.coste_mana = coste_mana;
        this.color = color;
        this.tipo = tipo;
        this.rareza = rareza;
        this.texto_reglas = texto_reglas;
        this.valor_mercado = valor_mercado;
        this.fuerza_resistencia = fuerza_resistencia;
        this.marcas_lealtad = marcas_lealtad;
        this.id = id;
        this.nombre = nombre;
        this.coste_mana = coste_mana;
        this.color = color;
        this.tipo = tipo;
        this.rareza = rareza;
        this.texto_reglas = texto_reglas;
        this.valor_mercado = valor_mercado;
        if (tipo === Tipo.Criatura) {
            this.fuerza_resistencia = fuerza_resistencia;
        }
        if (tipo === Tipo.Planeswalker) {
            this.marcas_lealtad = marcas_lealtad;
        }
    }
}
