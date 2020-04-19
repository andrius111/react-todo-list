import React from 'react'
import BootstrapPagination from 'react-bootstrap/Pagination'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  function getFirstItem() {
    return (
      <BootstrapPagination.First 
        key="firstPage"
        onClick={ () => props.changePage(1) }
        disabled={ props.currentPage === 1 }
      />
    )
  }
  
  function getPreviousItem() {
    return (
      <BootstrapPagination.Prev 
        key="previousPage"
        onClick={ () => props.changePage(props.currentPage - 1) }
        disabled={ props.currentPage === 1 }
      />
    )
  }

  function getNumericItem(page) {
    return (
      <BootstrapPagination.Item 
        key={ page }
        active={ page === props.currentPage }
        onClick={ () => props.changePage(page) }
      >
        { page }
      </BootstrapPagination.Item>
    )
  }

  function getNextItem(pagesCount) {
    return (
      <BootstrapPagination.Next 
        key="nextPage"
        onClick={ () => props.changePage(props.currentPage + 1) }
        disabled={ props.currentPage === pagesCount }
      />
    )
  }

  function getLastItem(pagesCount) {
    return (
      <BootstrapPagination.Last 
        key="lastPage"
        onClick={ () => props.changePage(pagesCount) }
        disabled={ props.currentPage === pagesCount }
      />
    )
  }

  function getPagination() {
    const pagesCount = Math.ceil(props.totalItens / props.itensPerPage)
    let itens = []

    itens.push(getFirstItem())
    itens.push(getPreviousItem())

    for (let page = 1; page <= pagesCount; page++) {
      itens.push(getNumericItem(page))
    }

    itens.push(getNextItem(pagesCount))
    itens.push(getLastItem(pagesCount))

    return itens
  }
  
  return (
    <div className="flex-container">
      <BootstrapPagination data-testid="pagination">
        { getPagination() }
      </BootstrapPagination>
    </div>
  )
}

Pagination.propTypes = {
  totalItens: PropTypes.number.isRequired,
  itensPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
}

export default Pagination
