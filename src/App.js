import React, { lazy, Suspense, useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import client from './apollo';
const Register = lazy(() => import('./pages/Register'));
const List = lazy(() => import('./pages/List'))

const loading = () => <div style={{ textAlign: 'center' }}>Loading...</div>


function App() {
  useEffect(() => {
    toast.configure({
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnVisibilityChange: false,
      draggable: false,
      pauseOnHover: true,
      transition: Flip
    })
  }, [])
  return (
    <ApolloProvider client={client}>
      <Router>
        <Suspense fallback={loading()}>
          <div className="App">
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/admin" exact component={List} />
              <Route path="/" exact component={Welcome} />
            </Switch>
          </div>
        </Suspense>
      </Router>
    </ApolloProvider>

  );
}

export default App;
