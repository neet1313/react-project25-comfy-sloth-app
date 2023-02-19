import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

//--------------------- Destructures ----------------
const Filters = () => {
  const { filters: {
    text,
    company,
    category,
    color,
    min_price,
    max_price,
    price,
    shipping },
    updateFilterHandler,
    clearFilterHandler,
    all_products } = useFilterContext();

  //--------------------- Functions and Callbacks ----------------
  const formSubmitHandler = e => { e.preventDefault() }

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');

  return <Wrapper>
    <div className="content">
      <form onSubmit={formSubmitHandler}>
        {/* search Input */}
        <div className="form-control">
          <input type="text"
            className='search-input'
            name='text'
            placeholder='search'
            value={text}
            onChange={updateFilterHandler}
          />
        </div>
        {/* end search Input */}

        {/* Categories */}
        <div className="form-control">
          <h5>category</h5>
          <div>{categories.map(ctgry =>
            <button
              type='button'
              key={ctgry}
              name='category'
              value={ctgry}
              onClick={updateFilterHandler}
              className={(category === ctgry.toLowerCase()) ? 'active' : null}
            >{ctgry}</button>
          )}</div>
        </div>
        {/* End of categories */}

        {/* Companies  */}
        <div className="form-control">
          <h5>companies</h5>
          <select name="company" onChange={updateFilterHandler} value={company} className='company'>
            {companies.map(cmpny => <option key={cmpny}>{cmpny}</option>)}
          </select>
        </div>
        {/* End of Companies  */}

        {/* Colors  */}
        <div className="form-control">
          <h5>colors</h5>
          <div className="colors">
            {colors.map(clr => {

              if (clr === 'all') {
                return <button
                  key={clr}
                  type='button'
                  name='color'
                  value={clr}
                  className={color === clr ? 'all-btn active' : 'all-btn'}
                  onClick={updateFilterHandler}>
                  all
                </button>
              }

              return <button
                type='button'
                key={clr}
                className={color === clr ? 'color-btn active' : 'color-btn'}
                name='color'
                value={clr}
                style={{ background: clr }}
                onClick={updateFilterHandler}>
                {color === clr ? <FaCheck /> : null}
              </button>
            }
            )}
          </div>
        </div>
        {/* End of Colors  */}

        {/* Price  */}
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{formatPrice(price)}</p>
          <input type="range"
            name="price"
            value={parseInt(price)}
            min={min_price}
            max={max_price}
            onChange={updateFilterHandler}
          />
        </div>
        {/* End of Price  */}

        {/* shipping  */}
        <div className="form-control shipping">
          <label htmlFor="shipping" >free shipping</label>
          <input type="checkbox" name="shipping" id="shipping" onChange={updateFilterHandler} checked={shipping} />
        </div>
        {/* End of shipping  */}
      </form>

      <button type='button' className="clear-btn" onClick={clearFilterHandler}>clear filters</button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
