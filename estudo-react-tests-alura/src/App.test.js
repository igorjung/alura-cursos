import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App, { calcularNovoSaldo } from './App';

describe('Componente principal', () => {
  describe('Quando eu abro o App', () => {
    it('O nome é exibido', () => {
      render(<App />);

      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    })
    it('O saldo é exibido', () => {
      render(<App />);

      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })
    it('O botão de realizar operação é exibido', () => {
      render(<App />);

      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    })
  })
  describe('Quando eu realizo uma transação', () => {
    describe('Que é um saque', () => {
      it('De um valor menor que o saldo, o valor vai diminuir e ficar positivo', () => {
        const saldo = 150;
        const valores = {
          transacao: 'saque',
          valor: 50,
        };
  
        const novoSaldo = calcularNovoSaldo(valores, saldo);
  
        expect(novoSaldo).toBe(100);
      })
      it('De um valor maior que o saldo, o valor vai diminuir e ficar negativo', () => {
        const saldo = 150;
        const valores = {
          transacao: 'saque',
          valor: 200,
        };
  
        const novoSaldo = calcularNovoSaldo(valores, saldo);
  
        expect(novoSaldo).toBe(-50);
      })
      it('A transação deve ser realizada', () => {
        render(<App />);

        const saldo = screen.getByText('R$ 1000');
        const transacao = screen.getByLabelText('Saque');
        const valor = screen.getByTestId('valor');
        const botaoTransacao = screen.getByText('Realizar operação');

        expect(saldo.textContent).toBe('R$ 1000');

        fireEvent.click(transacao, { target: {valor: 'saque'}});
        fireEvent.change(valor, { target: {value: '10'}});
        fireEvent.click(botaoTransacao);

        expect(saldo.textContent).toBe('R$ 990');

        fireEvent.click(transacao, { target: {valor: 'saque'}});
        fireEvent.change(valor, { target: {value: '1000'}});
        fireEvent.click(botaoTransacao);

        expect(saldo.textContent).toBe('R$ -10');
      })
    })
    describe('Que é um depósito', () => {
      it('O valor vai aumentar', () => {
        const saldo = 150;
        const valores = {
          transacao: 'deposito',
          valor: 50,
        };
  
        const novoSaldo = calcularNovoSaldo(valores, saldo);
  
        expect(novoSaldo).toBe(200);
      })
      it('A transação deve ser realizada', () => {
        render(<App />);

        const saldo = screen.getByText('R$ 1000');
        const transacao = screen.getByLabelText('Depósito');
        const valor = screen.getByTestId('valor');
        const botaoTransacao = screen.getByText('Realizar operação');

        expect(saldo.textContent).toBe('R$ 1000');

        fireEvent.click(transacao, { target: {valor: 'deposito'}});
        fireEvent.change(valor, { target: {value: '10'}});
        fireEvent.click(botaoTransacao);

        expect(saldo.textContent).toBe('R$ 1010');
      })
    })
  })
})
