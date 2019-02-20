import React from 'react';

import Header from '../components/header';
import CloudinaryWidget from '../components/cloudinaryWidget';
import ImageGallery from '../components/imageGallery';

import '../global-styles.css'

class HomePage extends React.Component {
    render() {
        return (
            <React.Fragment className="mainContainer">
                <Header />
                <CloudinaryWidget />
                <ImageGallery />
            </React.Fragment>
        )
    }
}

export default HomePage;