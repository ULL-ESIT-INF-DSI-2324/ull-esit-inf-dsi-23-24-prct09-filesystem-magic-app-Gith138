[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/T5K9tzcv)       
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Gith138/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Gith138?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Gith138&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-Gith138)

# Práctica 9 - Aplicación para coleccionistas de cartas Magic
  
Godgith John alu0101463858@ull.edu.es  

# Informe

### Introducción    
En esta práctica hay que aplicar todo lo aprendido relacionado con typescript y el diseño orientado a objetos.
Hay que implementar una aplicación que permita almacenar información de una colección de cartas Magic de un usuario concreto. En concreto, el sistema permitirá añadir, modificar, eliminar, listar y leer la información asociada a dichas cartas, usando los paquetes `yargs` y `chalk` y usar `API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros`

### Objetivos a lograr realizando esta práctica
Aprender más acerca de los paquetes de  `yargs` y `chalk`, respetar los **Principios SOLID**, seguir la metodología `TDD` o `BDD` que implica confirmar el correcto funcionamiento del código desarrollado y probar en los casos de que el código de un error porque la entrada no sea correcta(_errors should never pass silently_).

Los paquetes:
- `Yargs`
  Yargs es un módulo de análisis de líneas de comandos para Node.js. Permite crear herramientas de línea de comandos interactivas y fáciles de usar.
  ```ts
  npm i yargs
  npm i --save-dev @types/yargs
  ```
  
- `Chalk`
  Chalk es un módulo para dar estilos y colores a la salida de texto en la consola de Node.js.
  Para instalarlo:
  ```ts
  npm i chalk
  ```
Se debe instalar el `c8` para usar el módulo:
```ts
npm i --save-dev c8
```

- `API síncrona de Node.js para trabajar con el sistema de ficheros`
  Hay que instalarse el paquete `@types/node` como dependencia de desarrollo para poder hacer uso de cualquiera de los módulos proporcionados por el API de Node.js.
  
### Ejercicios y su explicación
### Descripción de los requisitos de la aplicación
### magic-app
Aqui implemento distintos interfaces para poder describir los distintos elementos:
```ts

export enum Color {
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
export enum Tipo {
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
export enum Rareza {
  Comun = "Comun",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mitica"
}
```
Después implemento una clase donde creo una instancia los distintos elementos:
```ts
export class Cartas {
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
  constructor( public id: number, public nombre: string, public coste_mana: number, public color: Color, public tipo: Tipo, public rareza: Rareza, public texto_reglas: string, public valor_mercado: number, public fuerza_resistencia?: [number, number], public marcas_lealtad?: number) {
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
```
### cartas
Creo una clase donde declaro los distintos métodos a implementar:

- **Añadir una carta a la colección**. Antes de añadir una carta a la colección se debe comprobar si ya existe una carta con el mismo ID. En caso de que así fuera, deberá mostrarse un mensaje de error por la consola. En caso contrario, se añadirá la nueva carta a la colección y se mostrará un mensaje informativo por la consola:
  ```ts
  public AyadirCarta(carta: Cartas, usuario: string): void {
		const directorio_cartas = `./cartas/${usuario}`;
		const RutaCarta = `${directorio_cartas}/${carta.id}.json`;
			
		if (!fs.existsSync(directorio_cartas)) { // Verificar si no existe el directorio
			fs.mkdirSync(directorio_cartas, { recursive: true }); // Crea el directorio
		}

		if (fs.existsSync(RutaCarta)) { // Verificar si la carta existe
			console.log(chalk.red(`La carta ya existe en la colección de ${usuario}!`));
		} else { //	Añadir la carta
			fs.writeFileSync(RutaCarta, JSON.stringify(carta, null, 2));
			console.log(chalk.green(`Nueva carta añadida a la colección de ${usuario}!`));
		}
	}
  ```

- **Modificar una carta de la colección**. Antes de modificar una carta, previamente se debe comprobar si ya existe una carta con el ID de la carta a modificar en la colección. Si existe, se procede a su modificación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola:
  ```ts
	public ActualizarCarta(carta: Cartas, usuario: string): void {
		const directorio_cartas = `./cartas/${usuario}`;
		const RutaCarta = `${directorio_cartas}/${carta.id}.json`;

		if (!fs.existsSync(RutaCarta)) { // Verificar si la carta existe
			console.log(chalk.red(`La carta no existe en la colección de ${usuario}!`));
		} else { //	Actualizar la carta
			fs.writeFileSync(RutaCarta, JSON.stringify(carta, null, 2));
			console.log(chalk.green(`Carta actualizada en la colección de ${usuario}!`));
		}
	}
  ```

- **Eliminar una carta de la lista**. Antes de eliminar una carta, previamente se debe comprobar si existe una carta con el ID de la carta a eliminar en la lista. Si existe, se procede a su eliminación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.
 ```ts
	public EliminarCarta(id: number, usuario: string): void {
		const directorio_cartas = `./cartas/${usuario}`;
		const RutaCarta = `${directorio_cartas}/${id}.json`;

		if (!fs.existsSync(RutaCarta)) { // Verificar si la carta existe
			console.log(chalk.red(`La carta no existe en la colección de ${usuario}!`));
		} else {
			fs.unlinkSync(RutaCarta); // Eliminar la carta
			console.log(chalk.green(`Carta eliminada de la colección de ${usuario}!`));
		}
	}
  ```
- **Listar las cartas existentes en una colección**. En este caso, deberá mostrarse la información asociada a cada carta existente en la colección por la consola. Además, deberá utilizar el paquete chalk para mostrar la información del campo color de cada carta, en el color correspondiente.
  ```ts
	public ListarCartas(usuario: string): void {
		const directorio_cartas = `./cartas/${usuario}`;

		if (!fs.existsSync(directorio_cartas)) { 
			console.log(chalk.red(`${usuario} no tiene una colección de cartas`));
		} else {
			const archivos = fs.readdirSync(directorio_cartas); // Leer los archivos de la colección
			archivos.forEach((archivo) => { //	Iterar sobre los archivos
				const carta = fs.readFileSync(`${directorio_cartas}/${archivo}`).toString(); 
				this.MostrarCartas(carta); // Mostrar los detalles de la carta
			});
		}
	}

  ```

- **Mostrar la información de una carta concreta**existente en la colección. Antes de mostrar la información de la carta, se debe comprobar que en la colección existe una carta cuyo ID sea el de la carta a mostrar. Si existe, se mostrará toda su información, incluyendo su color a través del uso del paquete chalk. En caso contrario, se mostrará un mensaje de error por la consola.
  ```ts
	public MostrarCarta(id: number, usuario: string): void {
		const directorio_cartas = `./cartas/${usuario}`;
		const RutaCarta = `${directorio_cartas}/${id}.json`;

		if (!fs.existsSync(RutaCarta)) { // Verificar si la carta existe
			console.log(chalk.red(`Carta no encontrada en la colección de ${usuario}`));
		} else {
			const carta = fs.readFileSync(RutaCarta).toString(); // Leer el archivo
			this.MostrarCartas(carta);
		}
	}
  ```
  En donde `MostrarCartas`:
  ```ts
  private MostrarCartas(carta: string): void {
		const carta_json = JSON.parse(carta); // Convertir el string a JSON
		let resultado = '';
		resultado += `Id: ${carta_json.id}\n`;
		resultado += `Nombre: ${carta_json.nombre}\n`;
		resultado += `Coste de maná: ${carta_json.coste_mana}\n`;
		resultado += `Color: ${carta_json.color}\n`;
		resultado += `Linea de tipo: ${carta_json.tipo}\n`;
		resultado += `Rareza: ${carta_json.rareza}\n`;
		resultado += `Texto de reglas: ${carta_json.texto_reglas}\n`;
		if (carta_json.tipo === 'Criatura') { // Mostrar la fuerza y resistencia de la criatura
			resultado += `Fuerza/Resistencia: ${carta_json.fuerza_resistencia}\n`;
		}
		if (carta_json.tipo === 'Planeswalker') { // Mostrar las marcas de lealtad del planeswalker
			resultado += `Marcas de lealtad: ${carta_json.marcas_lealtad}\n`;
		}
		resultado += `Valor de mercado: ${carta_json.valor_mercado}\n`;
	
		switch (carta_json.color) { // Mostrar el color de la carta
			case 'Blanco':
				console.log(chalk.white(resultado));
				break;
			case 'Azul':
				console.log(chalk.blue(resultado));
				break;
			case 'Negro':
				console.log(chalk.black(resultado));
				break;
			case 'Rojo':
				console.log(chalk.red(resultado));
				break;
			case 'Verde':
				console.log(chalk.green(resultado));
				break;
			case 'Incoloro':
				console.log(chalk.gray(resultado));
				break;
			case 'Multicolor':
				console.log(chalk.yellow(resultado));
				break;
			default:
				console.log(chalk.red('No se reconoce el color!'));
				break;
		}
	}
  ```
### main
Aqui en el main, es donde se implementa el paquete `yargs` para asi crear una interfaz de linea de comando, en donde la terminal se puede realizar diversas operaciones como añadir, mostrar, listar, eliminar y actualizar cartas en la colección:
```ts
let argv = yargs(hideBin(process.argv))
  .command(
    'add',
    'Añade una carta a la colección',
    {
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
    },
    (argv) => {
      if (argv.tipo === 'Criatura' && argv.fuerza_resistencia === undefined) {
        throw new Error('Criatura necesito el atributo de fuerza/resistencia');
      }
      if (argv.tipo === 'Planeswalker' && argv.marcas_lealtad === undefined) {
        throw new Error('Planeswalker necesita la marca de lealtad');
      }
      const cartas: Cartas = new Cartas(
        argv.id,
        argv.nombre,
        argv.coste_mana,
        argv.color as unknown as Color,
        argv.tipo as unknown as Tipo,
        argv.rareza as unknown as Rareza,
        argv.texto_reglas,
        argv.valor_mercado,
        argv.fuerza_resistencia,
        argv.marcas_lealtad,
      );
      coleccionar_cartas.AyadirCarta(cartas, argv.usuario);
    },
  )
.help().argv;
```
Y habría que hacer esto con todos los demás métodos.

### Dificultades

  Esta práctica ha sido complicada, porque me ha resultado difícil entender bien el funcionamiento de los distintos paquetes y como usar los métodos proporcionados por el `API síncrona de Node.js`

### Bibliografía
- [Yargs](https://www.npmjs.com/package/yargs)
- [Chalk](https://www.npmjs.com/package/chalk)
- [node.js](https://nodejs.org/docs/latest/api/fs.html)
  
Grado de Ingeniería Informática	

Godgith John

Desarrollo de Sistemas Informáticos	

Práctica 9 - Aplicación para coleccionistas de cartas Magic
  
