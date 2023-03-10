import React from 'react';
// import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import PostsManager from './features/post/PostList';

import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from './features/auth/authApi';
import { logout, selectIsAuthenticated } from './features/auth/authSlice';
import {
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
} from 'mdb-react-ui-kit';
import PostDetail from './features/post/PostDetail';
import PostAdd from './features/post/PostAdd';
import PostEdit from './features/post/PostEdit';

function App() {
  const [login] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  // interface Protected {
  //   isAllowed: boolean;
  //   redirectPath: string;
  //   children?: React.ReactNode | null;
  // }
  // const ProtectedRoute = (p: Protected) => {
  //   if (!p.isAllowed) {
  //     return <Navigate to={p.redirectPath} replace />;
  //   }

  //   return p.children ? p.children : <Outlet />;
  // };

  return (
    <div>
      <MDBNavbar expand="lg" bgColor="primary" dark>
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">Post Manager</MDBNavbarBrand>
          <MDBNavbarNav className="me-auto">
            <MDBNavbarItem>
              <NavLink className="nav-item nav-link" to="/">
                Home
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink className="nav-item nav-link" to="/counter">
                Counter
              </NavLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <div className="d-flex input-group w-auto">
            {!isAuthenticated ? (
              <MDBBtn
                outline
                color="light"
                aria-label="Login"
                onClick={() => {
                  login({ ignore: 'This will just set the headers' });
                }}
              >
                {' '}
                Login
              </MDBBtn>
            ) : (
              <MDBBtn
                color="danger"
                aria-label="Logout"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </MDBBtn>
            )}
          </div>
        </MDBContainer>
      </MDBNavbar>

      <Routes>
        <Route index element={<PostsManager />}></Route>
        <Route path="post">
          <Route index element={<PostAdd />}></Route>
          <Route path=":id" element={<PostDetail />}></Route>
          <Route path="edit/:id" element={<PostEdit />}></Route>
        </Route>
        <Route path="/counter" element={<Counter />}></Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // </div>
  );
}

export default App;
