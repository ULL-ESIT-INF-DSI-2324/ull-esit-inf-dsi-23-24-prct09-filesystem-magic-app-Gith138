import fs from 'fs';
import chalk from "chalk";
import { Cartas } from './magic-app.js';

export class ColeccionCartas {
	private coleccion: Cartas[] = [];

	/**
	 * Muestra los detalles de una carta.
	 * @param carta - La carta a mostrar.
	 */
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

	/**
	 * Agrega una carta a la colección.
	 * @param carta - La carta a agregar.
	 * @param usuario - El nombre del usuario.
	 */
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

	/**
	 * Actualiza una carta en la colección.
	 * @param carta - La carta actualizada.
	 * @param usuario - El nombre del usuario.
	 */
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

	/**
	 * Elimina una carta de la colección.
	 * @param id - El ID de la carta a eliminar.
	 * @param usuario - El nombre del usuario.
	 */
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

	/**
	 * Lista todas las cartas de la colección.
	 * @param usuario - El nombre del usuario.
	 */
	public ListarCartas(usuario: string): void {
		const directorio_cartas = `./cartas/${usuario}`;

		if (!fs.existsSync(directorio_cartas)) { // Verificar si el usuario tiene una colección de cartas
			console.log(chalk.red(`${usuario} no tiene una colección de cartas`));
		} else {
			const archivos = fs.readdirSync(directorio_cartas); // Leer los archivos de la colección
			archivos.forEach((archivo) => { //	Iterar sobre los archivos
				const carta = fs.readFileSync(`${directorio_cartas}/${archivo}`).toString(); // Leer el archivo
				this.MostrarCartas(carta); // Mostrar los detalles de la carta
			});
		}
	}

	/**
	 * Muestra los detalles de una carta específica.
	 * @param id - El ID de la carta a mostrar.
	 * @param usuario - El nombre del usuario.
	 */
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
}