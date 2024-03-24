import chalk from "chalk";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
// Enumeraciones para colores, tipos y rarezas de las cartas
var CardColor;
(function (CardColor) {
    CardColor["BLANCO"] = "blanco";
    CardColor["AZUL"] = "azul";
    CardColor["NEGRO"] = "negro";
    CardColor["ROJO"] = "rojo";
    CardColor["VERDE"] = "verde";
    CardColor["INCOLORO"] = "incoloro";
    CardColor["MULTICOLOR"] = "multicolor";
})(CardColor || (CardColor = {}));
;
var CardType;
(function (CardType) {
    CardType["TIERRA"] = "Tierra";
    CardType["CRIATURA"] = "Criatura";
    CardType["ENCANTAMIENTO"] = "Encantamiento";
    CardType["CONJURO"] = "Conjuro";
    CardType["INSTANTANEO"] = "Instant\u00E1neo";
    CardType["ARTEFACTO"] = "Artefacto";
    CardType["PLANESWALKER"] = "Planeswalker";
})(CardType || (CardType = {}));
;
var CardRarity;
(function (CardRarity) {
    CardRarity["COMUN"] = "com\u00FAn";
    CardRarity["INFRECUENTE"] = "infrecuente";
    CardRarity["RARA"] = "rara";
    CardRarity["MITICA"] = "m\u00EDtica";
})(CardRarity || (CardRarity = {}));
;
// Función para guardar una carta en un archivo JSON
const saveCardToFile = (username, card) => {
    const filePath = `./data/${username}/${card.ID}.json`;
    fs.writeFileSync(filePath, JSON.stringify(card));
};
// Función para añadir una carta a la colección de un usuario
const addCard = (username, card) => {
    const filePath = `./data/${username}/${card.ID}.json`;
    if (fs.existsSync(filePath)) {
        console.log(chalk.red('¡Error! Ya existe una carta con ese ID.'));
    }
    else {
        saveCardToFile(username, card);
        console.log(chalk.green('Carta añadida correctamente.'));
    }
};
// Comando para añadir una carta a la colección
yargs(hideBin(process.argv))
    .command({
    command: 'add',
    describe: 'Añade una nueva carta a la colección',
    builder: {
        username: {
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
        costeDeMana: {
            describe: 'Coste de maná',
            demandOption: true,
            type: 'number'
        },
        color: {
            describe: 'Color de la carta',
            demandOption: true,
            choices: Object.values(CardColor)
        },
        tipo: {
            describe: 'Tipo de la carta',
            demandOption: true,
            choices: Object.values(CardType)
        },
        rareza: {
            describe: 'Rareza de la carta',
            demandOption: true,
            choices: Object.values(CardRarity)
        },
        textoDeReglas: {
            describe: 'Texto de reglas de la carta',
            demandOption: true,
            type: 'string'
        },
        fuerza: {
            describe: 'Fuerza de la carta (solo para criaturas)',
            type: 'number'
            /* coerce: (arg) => arg.map(Number),
             */
        },
        resistencia: {
            describe: 'Resistencia de la carta (solo para criaturas)',
            type: 'number'
        },
        marcasDeLealtad: {
            describe: 'Marcas de lealtad de la carta (solo para planeswalkers)',
            type: 'number'
        },
        valorDeMercado: {
            describe: 'Valor de mercado de la carta',
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv) => {
        const card = {
            ID: argv.id,
            Nombre: argv.nombre,
            CosteDeMana: argv.costeDeMana,
            Color: argv.color,
            Tipo: argv.tipo,
            Rareza: argv.rareza,
            TextoDeReglas: argv.textoDeReglas,
            Fuerza: argv.fuerza,
            Resistencia: argv.resistencia,
            MarcasDeLealtad: argv.marcasDeLealtad,
            ValorDeMercado: argv.valorDeMercado
        };
        addCard(argv.username, card);
    }
})
    .parse();
