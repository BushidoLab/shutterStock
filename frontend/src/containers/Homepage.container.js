import React from 'react';

import Header from '../components/header';
// import CloudinaryWidget from '../components/cloudinaryWidget';
import SimpleUpload from '../components/simpleUpload';
import ImageGallery from '../components/imageGallery';

import '../global-styles.css'

class HomePage extends React.Component {
    render() {
        return (
            <div className="mainContainer">
                <Header />
                {/* <CloudinaryWidget /> */}
                <SimpleUpload />
                <ImageGallery />
            </div>
        )
    }
}

export default HomePage;