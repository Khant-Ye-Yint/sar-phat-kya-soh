import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './auth/Auth';
import PrivateRoute from './auth/PrivateRoute';
import NavComponent from './components/layout/NavbarComponent';
import Footer from './components/layout/FooterComponent';

import HomeComponent from './components/HomeComponents/HomeComponent';
import BookList from './components/HomeComponents/BookList';
import EditBook from './components/DashboardComponents/Book/EditBook';
import AddBook from './components/DashboardComponents/Book/AddBook';
import Login from './components/DashboardComponents/Login';
import DashNav from './components/DashboardComponents/DashNav';
import Lend from './components/DashboardComponents/LetsLend/Lend';
import Return from './components/DashboardComponents/LetsLend/Return';
import DashBookList from './components/DashboardComponents/Book/BookList';
import AllRecords from './components/DashboardComponents/Record/AllRecords/RecordList';
import UnreRecords from './components/DashboardComponents/Record/UnreturnedRecords/RecordList';
import OutRecords from './components/DashboardComponents/Record/OutdatedRecords/RecordList';
import MyAcc from './components/DashboardComponents/MyAcc/MyAcc';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" exact component={NavComponent} />
        <Route path="/books" exact component={NavComponent} />
        <Route path="/" exact component={HomeComponent} />

        <Route path="/books" exact component={BookList} />

        <PrivateRoute path="/dashboard" component={DashNav} />
        <PrivateRoute path="/dashboard/lend" exact component={Lend} />
        <PrivateRoute path="/dashboard/return" exact component={Return} />
        <PrivateRoute path="/dashboard/books" exact component={DashBookList} />
        <PrivateRoute
          path="/dashboard/books/edit/:id"
          exact
          component={EditBook}
        />
        <PrivateRoute
          path="/dashboard/books/addBook"
          exact
          component={AddBook}
        />
        <PrivateRoute path="/dashboard/records" exact component={AllRecords} />
        <PrivateRoute
          path="/dashboard/unreturnedRecords"
          exact
          component={UnreRecords}
        />
        <PrivateRoute
          path="/dashboard/outdatedRecords"
          exact
          component={OutRecords}
        />
        <PrivateRoute path="/dashboard/myAcc" exact component={MyAcc} />

        <Route exact path="/dashboard/login" component={Login} />
        <Route path="/" exact component={Footer} />
        <Route path="/books" exact component={Footer} />
      </Router>
    </AuthProvider>
  );
}
