import React, { Fragment } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {

    return (
        <Fragment>
            <Navbar />
            <div className='container'>{children}</div>
        </Fragment>
    );
};

export default Layout;