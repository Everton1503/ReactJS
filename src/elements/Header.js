import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <nav className='navbar navbar-light'>        
                    <Link tag='a' className='navbar-brand' to=''>My Money</Link>
                    <Link to=''> Movimentações </Link>
            </nav>
        </div>
    )
}
export default Header
