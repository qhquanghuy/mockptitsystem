/*
 * File: Home.component.js
 * Project: simple-react-full-stack
 * File Created: Monday, 22nd October 2018 11:43:59 am
 * Author: huynguyen (qhquanghuy96@gmail.com)
 * -----
 * Last Modified: Sunday, 2nd December 2018 8:43:40 am
 * Modified By: huynguyen (qhquanghuy96@gmail.com)
 * -----
 */


import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => (
	<div>
        <h3>Home page</h3>
        <Link to="/signin">login</Link>
    </div>
);

export default Home;



