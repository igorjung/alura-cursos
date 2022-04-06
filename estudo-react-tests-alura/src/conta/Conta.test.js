import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Conta from './Conta';

describe('Componente de conta', () => {
  it('o snapshot do component deve permanecer sempre o mesmo', () => {
    const { container } = render(<Conta saldo={100}/>)
    expect(container.firstChild).toMatchSnapshot();
  })
  it('o saldo deve sempre ser exibido com formatação de monetária', () => {
    render(<Conta saldo={100}/>)

    const saldo = screen.getByTestId('saldo-conta');

    expect(saldo.textContent).toBe('R$ 100');
  })
  it('chamar função de realziar transação, quando o botão é clicado', () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={100} realizarTransacao={funcaoRealizarTransacao}/>);

    const botao = screen.getByText('Realizar operação');
    fireEvent.click(botao);

    expect(funcaoRealizarTransacao).toBeCalled();
  })
})