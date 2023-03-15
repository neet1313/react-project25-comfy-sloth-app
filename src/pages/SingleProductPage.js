import { useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GET_SINGLE_PRODUCT_ERROR_FALSE } from '../actions'

const SingleProductPage = () => {
  //-------------------------Hooks-----------------------
  const { fetchSingleProduct, single_product_loading: loading,
    single_product_error: error,
    single_product: product, dispatch } = useProductsContext();
  const { id } = useParams();
  const history = useHistory();

  const { name, price, description, stock, id: sku, company, images, reviews, stars } = product;

  //-------------------------Functions-----------------------
  const redirectToHome = useCallback(() => {
    history.push('/');
    dispatch({ type: GET_SINGLE_PRODUCT_ERROR_FALSE })
  }, [dispatch, history]);


  //-------------------------Effects-----------------------
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    if (error) {
      setTimeout(redirectToHome, 3000);
    }
  }, [error, redirectToHome])

  //-------------------------Conditional Renderings-----------------------
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }
  return <Wrapper>
    <PageHero title={name} product />
    <div className='section section-center page'>
      <Link to='/products' className='btn'>
        back to products
      </Link>
      <div className='product-center'>
        <ProductImages images={images} />
        <section className='content'>
          <h2>{name}</h2>

          <Stars data={{ stars, reviews }} />

          <h5 className='price'>{formatPrice(price)}</h5>
          <p className='desc'>{description}</p>
          <p className='info'>
            <span>Available:</span>
            {stock > 0 ? <p>In stock  ({stock} items left)</p> : <p style={{ color: '#DB2D07' }}>Out of stock </p>}
          </p>
          <p className='info'>
            <span>SKU:</span>
            {sku}
          </p>
          <p className='info'>
            <span>Brand:</span>
            {company}
          </p>
          <hr />
          {stock > 0 && <AddToCart product={product} />}
        </section>
      </div>
    </div>
  </Wrapper>;
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage;
