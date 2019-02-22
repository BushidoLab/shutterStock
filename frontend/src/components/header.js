import React, { Fragment } from 'react';
import '../global-styles.css';

function Header() {
    return (
        <Fragment>
            <h1 style={{color: "white", position: "absolute", top: "10px", right: '45%' }}>Photo Gallery</h1>
        </Fragment>
    )
}

export default Header;