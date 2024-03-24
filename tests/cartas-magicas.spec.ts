import "mocha";
import { expect } from 'chai';
import { ColeccionCartas } from '../src/cartas';
import {Color, Tipo, Rareza, Cartas} from '../src/magic-app';

describe ('Carta tests', () => {
    it ('crear carta', () => {
      const carta = new Cartas(666, 'Test', 50, "Blanco" as Color, 'Instantaneo' as Tipo, 'Comun' as Rareza, 'textoooo', 600);
      expect(carta.id).to.be.equal(666);
      expect(carta.nombre).to.be.equal('Test');
      expect(carta.coste_mana).to.be.equal(50);
      expect(carta.color).to.be.equal('Blanco');
      expect(carta.tipo).to.be.equal('Instantaneo');
      expect(carta.rareza).to.be.equal('Comun');
      expect(carta.texto_reglas).to.be.equal('textoooo');
      expect(carta.valor_mercado).to.be.equal(600);
    });
    
    it('crear carta', () => {
      const carta = new Cartas(123, 'Carta de ejemplo', 4, "Azul" as Color, 'Criatura' as Tipo, 'Rara' as Rareza, 'Texto de reglas', 10);
      expect(carta.id).to.equal(123);
      expect(carta.nombre).to.equal('Carta de ejemplo');
      expect(carta.coste_mana).to.equal(4);
      expect(carta.color).to.equal('Azul');
      expect(carta.tipo).to.equal('Criatura');
      expect(carta.rareza).to.equal('Rara');
      expect(carta.texto_reglas).to.equal('Texto de reglas');
      expect(carta.valor_mercado).to.equal(10);
    });
  
    it('crear carta con fuerza y resistencia', () => {
      const carta = new Cartas(456, 'Criatura poderosa', 5, "Rojo" as Color, 'Criatura' as Tipo, 'Mítica' as Rareza, 'Otra regla aquí', 20, [5, 5]);
      expect(carta.id).to.equal(456);
      expect(carta.nombre).to.equal('Criatura poderosa');
      expect(carta.coste_mana).to.equal(5);
      expect(carta.color).to.equal('Rojo');
      expect(carta.tipo).to.equal('Criatura');
      expect(carta.rareza).to.equal('Mítica');
      expect(carta.texto_reglas).to.equal('Otra regla aquí');
      expect(carta.valor_mercado).to.equal(20);
      expect(carta.fuerza_resistencia).to.deep.equal([5, 5]);
    });
  
    it('crear carta de planeswalker', () => {
      const carta = new Cartas(789, 'Planeswalker épico', 6, "Verde" as Color, 'Planeswalker' as Tipo, 'Rara' as Rareza, 'Texto de reglas especial', 30, undefined, 4);
      expect(carta.id).to.equal(789);
      expect(carta.nombre).to.equal('Planeswalker épico');
      expect(carta.coste_mana).to.equal(6);
      expect(carta.color).to.equal('Verde');
      expect(carta.tipo).to.equal('Planeswalker');
      expect(carta.rareza).to.equal('Rara');
      expect(carta.texto_reglas).to.equal('Texto de reglas especial');
      expect(carta.valor_mercado).to.equal(30);
      expect(carta.marcas_lealtad).to.equal(4);
    });
  
    it('crear carta con valores válidos', () => {
      const carta = new Cartas(789, 'Carta de ejemplo', 3, "Rojo" as Color, 'Encantamiento' as Tipo, 'Poco común' as Rareza, 'Texto de reglas para el encantamiento', 15);
      expect(carta.id).to.equal(789);
      expect(carta.nombre).to.equal('Carta de ejemplo');
      expect(carta.coste_mana).to.equal(3);
      expect(carta.color).to.equal('Rojo');
      expect(carta.tipo).to.equal('Encantamiento');
      expect(carta.rareza).to.equal('Poco común');
      expect(carta.texto_reglas).to.equal('Texto de reglas para el encantamiento');
      expect(carta.valor_mercado).to.equal(15);
    });
  
    it('crear carta con texto de reglas vacío', () => {
      const carta = new Cartas(101, 'Carta sin reglas', 2, "Verde" as Color, 'Criatura' as Tipo, 'Común' as Rareza, '', 5);
      expect(carta.id).to.equal(101);
      expect(carta.nombre).to.equal('Carta sin reglas');
      expect(carta.coste_mana).to.equal(2);
      expect(carta.color).to.equal('Verde');
      expect(carta.tipo).to.equal('Criatura');
      expect(carta.rareza).to.equal('Común');
      expect(carta.texto_reglas).to.equal('');
      expect(carta.valor_mercado).to.equal(5);
    });
  
    it('crear carta multicolor con fuerza y resistencia', () => {
      const carta = new Cartas(202, 'Bestia Multicolor', 4, "Multicolor" as Color, 'Criatura' as Tipo, 'Rara' as Rareza, 'Texto de reglas para la bestia multicolor', 25, [4, 4]);
      expect(carta.id).to.equal(202);
      expect(carta.nombre).to.equal('Bestia Multicolor');
      expect(carta.coste_mana).to.equal(4);
      expect(carta.color).to.equal('Multicolor');
      expect(carta.tipo).to.equal('Criatura');
      expect(carta.rareza).to.equal('Rara');
      expect(carta.texto_reglas).to.equal('Texto de reglas para la bestia multicolor');
      expect(carta.valor_mercado).to.equal(25);
      expect(carta.fuerza_resistencia).to.deep.equal([4, 4]);
    });
  
    it('crear carta de criatura con marcas de lealtad', () => {
      const carta = new Cartas(303, 'Planewalker Aliado', 5, "Blanco" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
      expect(carta.id).to.equal(303);
      expect(carta.nombre).to.equal('Planewalker Aliado');
      expect(carta.coste_mana).to.equal(5);
      expect(carta.color).to.equal('Blanco');
      expect(carta.tipo).to.equal('Planeswalker');
      expect(carta.rareza).to.equal('Mítica');
      expect(carta.texto_reglas).to.equal('Texto de reglas para el planeswalker aliado');
      expect(carta.valor_mercado).to.equal(50);
      expect(carta.marcas_lealtad).to.equal(5);
    });
  });
  
  describe ('Colección test', () => {
    const coleccion = new ColeccionCartas();
    it('agregar carta a colección', () => {
      const carta = new Cartas(303, 'Planewalker Aliado', 5, "Blanco" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
      coleccion.AyadirCarta(carta, 'Gifty');
    });
    it('actualizar carta de una colección', () => {
      const carta = new Cartas(303, 'Planewalker Aliado', 5, "Blanco" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
      coleccion.ActualizarCarta(carta, 'Gifty');
    });
    it('borrar carta de una colección', () => {
      coleccion.EliminarCarta(303, 'Gifty');
    });
    it('mostrar colección', () => {
      coleccion.ListarCartas('Gifty');
    });
    it('mostrar carta de una colección', () => {
      coleccion.MostrarCarta(1, 'Gifty');
    });
  });