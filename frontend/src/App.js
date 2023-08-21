import React from 'react';
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './PostList';
import Login from './Login';
import './App.css';
import Trial from './trial';
import NavigationBar from "./NavBar";
import LogOut from './LogOut';
import PostCreate from './PostCreate';
import PostDetail from './PostDetail';
import UserPost from './UserPost'



export default function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="App">
        <Routes>
          <Route path="/post/create" element={< PostCreate />} />
          <Route path="/post/:id" element= {< PostDetail />} />
          <Route path="/userpost/:username" element= {< UserPost />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/trial" element={< Trial /> } />
          <Route path="/post/list" element={< PostList />} />
          <Route path="/login" element={< Login />} />
        </Routes>
      </div>
    </Router>
  );
}



