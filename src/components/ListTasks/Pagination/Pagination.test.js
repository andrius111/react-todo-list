import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Pagination from './Pagination'

describe('Pagination tests', () => {
  it('must render the component whitout errors', () => {
    render(
      <Pagination 
        totalItens={ 10 }
        itensPerPage={ 10 }
        currentPage={ 1 }
        changePage={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )
  })

  it('must show the pagination with 3 pages', () => {
    const { getByTestId } = render(
      <Pagination 
        totalItens={ 15 }
        itensPerPage={ 5 }
        currentPage={ 1 }
        changePage={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )

    const pagination = getByTestId('pagination')
    expect(pagination).toHaveTextContent('1')
    expect(pagination).toHaveTextContent('2')
    expect(pagination).toHaveTextContent('3')
  })
})