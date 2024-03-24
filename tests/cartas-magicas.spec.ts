import 'mocha';
import { expect } from 'chai';
import { ColeccionCartas } from '../src/cartas.js';
import {Color, Tipo, Rareza, Cartas} from '../src/magic-app.js';

describe ('Carta tests', () => {
    it ('crear carta', () => {
      const carta = new Cartas(1234, 'Paz', 2024, "Rojo" as Color, 'Encantamiento' as Tipo, 'Infrecuente' as Rareza, 'si', 604);
      expect(carta.id).to.be.equal(1234);
      expect(carta.nombre).to.be.equal('Paz');
      expect(carta.coste_mana).to.be.equal(2024);
      expect(carta.color).to.be.equal('Rojo');
      expect(carta.tipo).to.be.equal('Encantamiento');
      expect(carta.rareza).to.be.equal('Infrecuente');
      expect(carta.texto_reglas).to.be.equal('si');
      expect(carta.valor_mercado).to.be.equal(604);
    });
    
    it('crear carta', () => {
      const carta = new Cartas(11003, 'bebe', 4, "Azul" as Color, 'Criatura' as Tipo, 'Rara' as Rareza, 'no', 10);
      expect(carta.id).to.equal(11003);
      expect(carta.nombre).to.equal('bebe');
      expect(carta.coste_mana).to.equal(4);
      expect(carta.color).to.equal('Azul');
      expect(carta.tipo).to.equal('Criatura');
      expect(carta.rareza).to.equal('Rara');
      expect(carta.texto_reglas).to.equal('no');
      expect(carta.valor_mercado).to.equal(10);
    });
  
    it('crear carta con fuerza y resistencia', () => {
      const carta = new Cartas(901, 'Criatura poderosa', 5, "Rojo" as Color, 'Criatura' as Tipo, 'Rara' as Rareza, 'Muy fuerte', 20, [5, 5]);
      expect(carta.id).to.equal(901);
      expect(carta.nombre).to.equal('Criatura poderosa');
      expect(carta.coste_mana).to.equal(5);
      expect(carta.color).to.equal('Rojo');
      expect(carta.tipo).to.equal('Criatura');
      expect(carta.rareza).to.equal('Rara');
      expect(carta.texto_reglas).to.equal('Muy fuerte');
      expect(carta.valor_mercado).to.equal(20);
      expect(carta.fuerza_resistencia).to.deep.equal([5, 5]);
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
    it('crear carta de Artefacto', () => {
      const carta = new Cartas(20, 'Artefacto Pedro Sanchez', 6, "Blanco" as Color, 'Artefacto' as Tipo, 'Rara' as Rareza, 'PSOE', 60, undefined, 4);
      expect(carta.id).to.equal(20);
      expect(carta.nombre).to.equal('Artefacto Pedro Sanchez');
      expect(carta.coste_mana).to.equal(6);
      expect(carta.color).to.equal('Blanco');
      expect(carta.tipo).to.equal('Artefacto');
      expect(carta.rareza).to.equal('Rara');
      expect(carta.texto_reglas).to.equal('PSOE');
      expect(carta.valor_mercado).to.equal(60);
      expect(carta.marcas_lealtad).to.equal(4);
    });
  
    it('crear carta con valores válidos', () => {
      const carta = new Cartas(20, 'Carta', 3, "Rojo" as Color, 'Encantamiento' as Tipo, 'Comun' as Rareza, 'encantamiento', 15);
      expect(carta.id).to.equal(20);
      expect(carta.nombre).to.equal('Carta');
      expect(carta.coste_mana).to.equal(3);
      expect(carta.color).to.equal('Rojo');
      expect(carta.tipo).to.equal('Encantamiento');
      expect(carta.rareza).to.equal('Comun');
      expect(carta.texto_reglas).to.equal('encantamiento');
      expect(carta.valor_mercado).to.equal(15);
    });
  
    it('crear carta con texto de reglas vacío', () => {
      const carta = new Cartas(112, 'Carta sin reglas', 2, "Verde" as Color, 'Criatura' as Tipo, 'Común' as Rareza, '', 5);
      expect(carta.id).to.equal(112);
      expect(carta.nombre).to.equal('Carta sin reglas');
      expect(carta.coste_mana).to.equal(2);
      expect(carta.color).to.equal('Verde');
      expect(carta.tipo).to.equal('Criatura');
      expect(carta.rareza).to.equal('Común');
      expect(carta.texto_reglas).to.equal('');
      expect(carta.valor_mercado).to.equal(5);
    });
  
    it('crear carta de criatura con marcas de lealtad', () => {
      const carta = new Cartas(303, 'Artefacto', 7, "Verde" as Color, 'Artefacto' as Tipo, 'Rara' as Rareza, 'Hace cosas raras el raro, son sus rarezas', 1230, undefined, undefined);
      expect(carta.id).to.equal(303);
      expect(carta.nombre).to.equal('Artefacto');
      expect(carta.coste_mana).to.equal(7);
      expect(carta.color).to.equal('Verde');
      expect(carta.tipo).to.equal('Artefacto');
      expect(carta.rareza).to.equal('Rara');
      expect(carta.texto_reglas).to.equal('Hace cosas raras el raro, son sus rarezas');
      expect(carta.valor_mercado).to.equal(1230);
      expect(carta.marcas_lealtad).to.equal(undefined);
    });
  });
  
  describe ('Colección test', () => {
    const coleccion = new ColeccionCartas();
    it('agregar carta a colección', () => {
      const carta = new Cartas(303, 'Artefacto', 7, "Verde" as Color, 'Artefacto' as Tipo, 'Rara' as Rareza, 'Hace cosas raras el raro, son sus rarezas', 1230, undefined, undefined);
      coleccion.AyadirCarta(carta, 'Gifty');
    });
    it('actualizar carta de una colección', () => {
      const carta = new Cartas(303, 'Artefacto', 7, "Verde" as Color, 'Artefacto' as Tipo, 'Rara' as Rareza, 'Hace cosas raras el raro, son sus rarezas', 1230, undefined, undefined);
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


