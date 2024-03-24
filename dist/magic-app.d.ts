/**
 * Enumeración de los colores de las cartas.
 */
export declare enum Color {
    Blanco = "Blanco",
    Azul = "Azul",
    Negro = "Negro",
    Rojo = "Rojo",
    Verde = "Verde",
    Incoloro = "Incoloro",
    Multicolor = "Multicolor"
}
/**
 * Enumeración de los tipos de las cartas.
 */
export declare enum Tipo {
    Tierra = "Tierra",
    Criatura = "Criatura",
    Encantamiento = "Encantamiento",
    Conjuro = "Conjuro",
    Instantaneo = "Instantaneo",
    Artefacto = "Artefacto",
    Planeswalker = "Planeswalker"
}
/**
 * Enumeración de las rarezas de las cartas.
 */
export declare enum Rareza {
    Comun = "Comun",
    Infrecuente = "Infrecuente",
    Rara = "Rara",
    Mitica = "Mitica"
}
/**
 * Representa una carta del juego.
 */
export declare class Cartas {
    id: number;
    nombre: string;
    coste_mana: number;
    color: Color;
    tipo: Tipo;
    rareza: Rareza;
    texto_reglas: string;
    valor_mercado: number;
    fuerza_resistencia?: [number, number] | undefined;
    marcas_lealtad?: number | undefined;
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
    constructor(id: number, nombre: string, coste_mana: number, color: Color, tipo: Tipo, rareza: Rareza, texto_reglas: string, valor_mercado: number, fuerza_resistencia?: [number, number] | undefined, marcas_lealtad?: number | undefined);
}
