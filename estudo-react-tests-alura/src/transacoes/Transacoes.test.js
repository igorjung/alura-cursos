import React from 'react';
import { render } from '@testing-library/react';

import Transacoes from './Transacoes';

describe('Componente de lista de transações', () => {
  it('O snapshot do component deve permanecer sempre o mesmo', () => {
    const transacoes = [{
      id: 1,
      transacao: 'saque',
      valor: '20.00',
      data: '16/03/2021',
    }, {
      id: 2,
      transacao: 'deposito',
      valor: '15.00',
      data: '17/03/2021',
    }]

    const { container } = render(<Transacoes transacoes={transacoes}/>)
    expect(container.firstChild).toMatchSnapshot();
  })
})