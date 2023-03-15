import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return <main>
    <PageHero title='about' />
    <Wrapper className='page section section-center'>
      <img src={aboutImg} alt='About' />
      <article>
        <div className='title'>
          <h2>Our Story</h2>
          <div className='underline' />
        </div>
        <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
          "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium tortor et magna faucibus, volutpat malesuada risus ullamcorper. Donec eu consequat quam. Sed laoreet elementum est at tincidunt. Maecenas eleifend.</p>
      </article>
    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
