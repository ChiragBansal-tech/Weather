import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex p-2 md:p-4 lg:p-5 border-b-2 border-blue-300 '>
            <Link to="/" className='text-4xl text-blue-500 font-semibold'><h1>Weather</h1></Link>
        </div>
    );
};

export default Navbar;