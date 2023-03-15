import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { About, AuthWrapper, Cart, Checkout, Error, Home, Products, SingleProduct, PrivateRoute } from './pages'

function App() {
  return <>
    <Navbar />
    <Sidebar />

    <AuthWrapper>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/checkout" exact ><Checkout /></PrivateRoute>
        <Route path="/products" exact component={Products} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="*" component={Error} />
      </Switch>
    </AuthWrapper>

    <Footer />
  </>
}

export default App
