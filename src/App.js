import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { About, AuthWrapper, Cart, Checkout, Error, Home, Products, SingleProduct, PrivateRoute } from './pages'

function App() {
  return <>
    <Navbar />
    <Sidebar />

    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/products" exact component={Products} />
      <Route path="/products/:id" component={SingleProduct} />
      <Route path="*" component={Error} />
    </Switch>

    <Footer />
  </>
}

export default App
