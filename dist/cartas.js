import fs from 'fs';
import chalk from "chalk";
export class ColeccionCartas {
    coleccion = [];
    /**
     * Muestra los detalles de una carta.
     * @param carta - La carta a mostrar.
     */
    MostrarCartas(carta) {
        const carta_json = JSON.parse(carta); // Convertir el string a JSON
        let resultado = '';
        resultado += `Id: ${carta_json.id}\n`;
        resultado += `Nombre: ${carta_json.nombre}\n`;
        resultado += `Coste de maná: ${carta_json.coste_mana}\n`;
        resultado += `Color: ${carta_json.color}\n`;
        resultado += `Linea de tipo: ${carta_json.tipo}\n`;
        resultado += `Rareza: ${carta_json.rareza}\n`;
        resultado += `Texto de reglas: ${carta_json.texto_reglas}\n`;
        if (carta_json.tipo === 'Criatura') {
            resultado += `Fuerza/Resistencia: ${carta_json.fuerza_resistencia}\n`;
        }
        if (carta_json.tipo === 'Planeswalker') {
            resultado += `Marcas de lealtad: ${carta_json.marcas_lealtad}\n`;
        }
        resultado += `Valor de mercado: ${carta_json.valor_mercado}\n`;
        switch (carta_json.color) {
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
    AyadirCarta(carta, usuario) {
        const DirectorioUsuario = `./cartas/${usuario}`;
        const RutaCarta = `${DirectorioUsuario}/${carta.id}.json`;
        if (!fs.existsSync(DirectorioUsuario)) {
            fs.mkdirSync(DirectorioUsuario, { recursive: true });
        }
        if (fs.existsSync(RutaCarta)) {
            console.log(chalk.red(`La carta ya existe en la colección de ${usuario}!`));
        }
        else {
            fs.writeFileSync(RutaCarta, JSON.stringify(carta, null, 2));
            console.log(chalk.green(`Nueva carta añadida a la colección de ${usuario}!`));
        }
    }
    /**
     * Actualiza una carta en la colección.
     * @param carta - La carta actualizada.
     * @param usuario - El nombre del usuario.
     */
    ActualizarCarta(carta, usuario) {
        const DirectorioUsuario = `./cartas/${usuario}`;
        const RutaCarta = `${DirectorioUsuario}/${carta.id}.json`;
        if (!fs.existsSync(RutaCarta)) {
            console.log(chalk.red(`La carta no existe en la colección de ${usuario}!`));
        }
        else {
            fs.writeFileSync(RutaCarta, JSON.stringify(carta, null, 2));
            console.log(chalk.green(`Carta actualizada en la colección de ${usuario}!`));
        }
    }
    /**
     * Elimina una carta de la colección.
     * @param id - El ID de la carta a eliminar.
     * @param usuario - El nombre del usuario.
     */
    EliminarCarta(id, usuario) {
        const DirectorioUsuario = `./cartas/${usuario}`;
        const RutaCarta = `${DirectorioUsuario}/${id}.json`;
        if (!fs.existsSync(RutaCarta)) {
            console.log(chalk.red(`La carta no existe en la colección de ${usuario}!`));
        }
        else {
            fs.unlinkSync(RutaCarta);
            console.log(chalk.green(`Carta eliminada de la colección de ${usuario}!`));
        }
    }
    /**
     * Lista todas las cartas de la colección.
     * @param usuario - El nombre del usuario.
     */
    ListarCartas(usuario) {
        const DirectorioUsuario = `./cartas/${usuario}`;
        if (!fs.existsSync(DirectorioUsuario)) {
            console.log(chalk.red(`${usuario} no tiene una colección de cartas`));
        }
        else {
            const archivos = fs.readdirSync(DirectorioUsuario);
            archivos.forEach((archivo) => {
                const carta = fs.readFileSync(`${DirectorioUsuario}/${archivo}`).toString();
                this.MostrarCartas(carta);
            });
        }
    }
    /**
     * Muestra los detalles de una carta específica.
     * @param id - El ID de la carta a mostrar.
     * @param usuario - El nombre del usuario.
     */
    MostrarCarta(id, usuario) {
        const DirectorioUsuario = `./cartas/${usuario}`;
        const RutaCarta = `${DirectorioUsuario}/${id}.json`;
        if (!fs.existsSync(RutaCarta)) {
            console.log(chalk.red(`Carta no encontrada en la colección de ${usuario}`));
        }
        else {
            const carta = fs.readFileSync(RutaCarta).toString();
            this.MostrarCartas(carta);
        }
    }
}
