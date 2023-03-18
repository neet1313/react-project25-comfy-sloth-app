//Navbar active links
//Lazy loading and optimizations
//Purify css
//load unnecessary scripts at the bottom of the page
//caching


import { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { AuthWrapper, Checkout, Error, Home, PrivateRoute } from './pages'
import { Loading } from './components';

// Lazy Load
const lazyAboutPage = lazy(() => import('./pages/AboutPage'));
const lazyCartPage = lazy(() => import('./pages/CartPage'));
const lazyProductsPage = lazy(() => import('./pages/ProductsPage'));
const lazySingleProductPage = lazy(() => import('./pages/SingleProductPage'));

function App() {
  return <>
    <Navbar />
    <Sidebar />

    <AuthWrapper>
      <Switch>
        <Route path="/" exact component={Home} />
        <Suspense fallback={<Loading />}>
          <Route path="/about" exact component={lazyAboutPage} />
          <Route path="/cart" exact component={lazyCartPage} />
          <PrivateRoute path="/checkout" exact ><Checkout /></PrivateRoute>
          <Route path="/products" exact component={lazyProductsPage} />
          <Route path="/products/:id" component={lazySingleProductPage} />
        </Suspense>
        <Route path="*" component={Error} />
      </Switch>
    </AuthWrapper>

    <Footer />
  </>
}

export default App
