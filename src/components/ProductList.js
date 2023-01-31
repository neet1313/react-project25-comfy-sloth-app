import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_Products: products, grid_view } = useFilterContext()

  if (products.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search.</h5>
  }

  return <>
    {grid_view ? <GridView products={products} /> : <ListView products={products} />}
  </>
}

export default ProductList
