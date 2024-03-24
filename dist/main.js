import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ColeccionCartas } from './cartas.js';
import { Cartas } from './magic-app.js';
const coleccionar_cartas = new ColeccionCartas;
/**
  * Comando para añadir una carta a la colección.
 */
let argv = yargs(hideBin(process.argv))
    .command('add', 'Añade una carta a la colección', {
    usuario: {
        describe: 'Nombre de usuario',
        demandOption: true,
        type: 'string'
    },
    id: {
        describe: 'ID de la carta',
        demandOption: true,
        type: 'number'
    },
    nombre: {
        describe: 'Nombre de la carta',
        demandOption: true,
        type: 'string'
    },
    coste_mana: {
        description: 'Coste de maná',
        type: 'number',
        demandOption: true,
    },
    color: {
        description: 'Color de la carta',
        type: 'string',
        choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor'],
        demandOption: true,
    },
    tipo: {
        description: 'Tipo de la carta',
        type: 'string',
        choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'],
        demandOption: true,
    },
    rareza: {
        description: 'Rareza de la carta',
        type: 'string',
        choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'],
        demandOption: true,
    },
    texto_reglas: {
        description: 'Texto de reglas de la carta',
        type: 'string',
        demandOption: true,
    },
    fuerza_resistencia: {
        description: 'Fuerza/Resistencia de la carta (solo para criaturas)',
        type: 'array',
        coerce: (arg) => arg.map(Number),
    },
    marcas_lealtad: {
        description: 'Marcas de lealtad de la carta (solo para planeswalkers)',
        type: 'number',
    },
    valor_mercado: {
        description: 'Valor de mercado de la carta',
        type: 'number',
        demandOption: true,
    },
}, (argv) => {
    if (argv.tipo === 'Criatura' && argv.fuerza_resistencia === undefined) {
        throw new Error('Criatura necesito el atributo de fuerza/resistencia');
    }
    if (argv.tipo === 'Planeswalker' && argv.marcas_lealtad === undefined) {
        throw new Error('Planeswalker necesita la marca de lealtad');
    }
    const cartas = new Cartas(argv.id, argv.nombre, argv.coste_mana, argv.color, argv.tipo, argv.rareza, argv.texto_reglas, argv.valor_mercado, argv.fuerza_resistencia, argv.marcas_lealtad);
    coleccionar_cartas.AyadirCarta(cartas, argv.usuario);
})
    .help().argv;
/**
 * Comando para mostrar una carta de la colección.
 */
argv = yargs(hideBin(process.argv))
    .command('show', 'Muestra una carta de la colección', {
    usuario: {
        describe: 'Nombre de usuario',
        demandOption: true,
        type: 'string'
    },
    id: {
        describe: 'ID de la carta',
        demandOption: true,
        type: 'number'
    },
}, (argv) => {
    coleccionar_cartas.MostrarCarta(argv.id, argv.usuario);
})
    .help().argv;
/**
 * Comando para listar todas las cartas de la colección.
 */
argv = yargs(hideBin(process.argv))
    .command('list', 'Muestra todas las cartas de la colección', {
    usuario: {
        describe: 'Nombre de usuario',
        demandOption: true,
        type: 'string'
    },
}, (argv) => {
    coleccionar_cartas.ListarCartas(argv.usuario);
})
    .help().argv;
/**
 * Comando para eliminar una carta de la colección.
 */
argv = yargs(hideBin(process.argv))
    .command('delete', 'Elimina una carta de la colección', {
    usuario: {
        describe: 'Nombre de usuario',
        demandOption: true,
        type: 'string'
    },
    id: {
        describe: 'ID de la carta',
        demandOption: true,
        type: 'number'
    },
}, (argv) => {
    coleccionar_cartas.EliminarCarta(argv.id, argv.usuario);
})
    .help().argv;
/**
 * Comando para actualizar una carta de la colección.
 */
argv = yargs(hideBin(process.argv))
    .command('update', 'Actualiza una carta a la colección', {
    usuario: {
        describe: 'Nombre de usuario',
        demandOption: true,
        type: 'string'
    },
    id: {
        describe: 'ID de la carta',
        demandOption: true,
        type: 'number'
    },
    nombre: {
        describe: 'Nombre de la carta',
        demandOption: true,
        type: 'string'
    },
    coste_mana: {
        description: 'Coste de maná',
        type: 'number',
        demandOption: true,
    },
    color: {
        description: 'Color de la carta',
        type: 'string',
        choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor'],
        demandOption: true,
    },
    tipo: {
        description: 'Tipo de la carta',
        type: 'string',
        choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'],
        demandOption: true,
    },
    rareza: {
        description: 'Rareza de la carta',
        type: 'string',
        choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'],
        demandOption: true,
    },
    texto_reglas: {
        description: 'Texto de reglas de la carta',
        type: 'string',
        demandOption: true,
    },
    fuerza_resistencia: {
        description: 'Fuerza/Resistencia de la carta (solo para criaturas)',
        type: 'array',
        coerce: (arg) => arg.map(Number),
    },
    marcas_lealtad: {
        description: 'Marcas de lealtad de la carta (solo para planeswalkers)',
        type: 'number',
    },
    valor_mercado: {
        description: 'Valor de mercado de la carta',
        type: 'number',
        demandOption: true,
    },
}, (argv) => {
    if (argv.tipo === 'Criatura' && argv.fuerza_resistencia === undefined) {
        throw new Error('Criatura necesito el atributo de fuerza/resistencia');
    }
    if (argv.tipo === 'Planeswalker' && argv.marcas_lealtad === undefined) {
        throw new Error('Planeswalker necesita la marca de lealtad');
    }
    const cartas = new Cartas(argv.id, argv.nombre, argv.coste_mana, argv.color, argv.tipo, argv.rareza, argv.texto_reglas, argv.valor_mercado, argv.fuerza_resistencia, argv.marcas_lealtad);
    coleccionar_cartas.ActualizarCarta(cartas, argv.usuario);
})
    .help().argv;
