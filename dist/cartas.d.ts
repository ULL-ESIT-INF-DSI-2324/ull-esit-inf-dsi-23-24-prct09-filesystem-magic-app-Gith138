import { Cartas } from './magic-app.js';
export declare class ColeccionCartas {
    private coleccion;
    /**
     * Muestra los detalles de una carta.
     * @param carta - La carta a mostrar.
     */
    private MostrarCartas;
    /**
     * Agrega una carta a la colección.
     * @param carta - La carta a agregar.
     * @param usuario - El nombre del usuario.
     */
    AyadirCarta(carta: Cartas, usuario: string): void;
    /**
     * Actualiza una carta en la colección.
     * @param carta - La carta actualizada.
     * @param usuario - El nombre del usuario.
     */
    ActualizarCarta(carta: Cartas, usuario: string): void;
    /**
     * Elimina una carta de la colección.
     * @param id - El ID de la carta a eliminar.
     * @param usuario - El nombre del usuario.
     */
    EliminarCarta(id: number, usuario: string): void;
    /**
     * Lista todas las cartas de la colección.
     * @param usuario - El nombre del usuario.
     */
    ListarCartas(usuario: string): void;
    /**
     * Muestra los detalles de una carta específica.
     * @param id - El ID de la carta a mostrar.
     * @param usuario - El nombre del usuario.
     */
    MostrarCarta(id: number, usuario: string): void;
}
