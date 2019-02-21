import React from "react";
import axios from "axios";
import {
    Image,
    Transformation,
    CloudinaryContext
} from "cloudinary-react";

import { Button, Modal } from "antd";
import "../global-styles.css";

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            gallery: [],
            isOpen: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080")
        .then(res => {
            this.setState({ gallery: res.data });
        })
        .catch(err => {
            console.error("Axios call: ",err);
        })
    }
    
    showModal = (data) => {
        let public_id = data.public_id;
        this.setState({
            isOpen: {
                [public_id]: true,
            }
        })
    }

    hideModal = (data) => {
        let public_id = data.public_id;
        this.setState({
            isOpen: {
                [public_id]: false,
            }
        })
    }

    render() {
        let gallery = this.state.gallery;
        let waterMark = {
            fontFamily: "Arial", 
            fontSize: 30, 
            fontWeight: "bold", 
            textColor: "rgba(255, 255, 255, 0.35)",
            text: "Sample version only"
        }

        if (gallery.length !== 0) {
            return (
                <div className="imageContainer">
                    <CloudinaryContext cloudName="diegolealb">
                    <div className="imageContainer">
                        {gallery.map(data => {
                            return (
                                data.public_id.includes("shutterStock") ?
                                <div key={data.public_id} className="container">
                                    <button onClick={() => this.showModal(data)} className="img">
                                        <div>
                                            <Image publicId={data.public_id}>
                                                <Transformation 
                                                    width="400"
                                                    height="400"
                                                    crop="scale"
                                                />
                                                <Transformation 
                                                    overlay={waterMark}
                                                />
                                            </Image>
                                        </div>
                                    </button>
                                    <Modal
                                        title="Download"
                                        visible={this.state.isOpen[data.public_id]}
                                        onCancel={() => this.hideModal(data)}
                                        cancelButtonProps={() => this.hideModal(data)}
                                        zIndex="100"
                                        footer={[
                                            <Button key="back" onClick={() => this.hideModal(data)}>Back</Button>
                                        ]}
                                    >
                                        <a href={data.secure_url}>
                                            <Button>
                                                Click for secure link
                                            </Button>
                                        </a>
                                    </Modal>
                                </div>
                                : null
                            )
                        })}
                        </div>
                    </CloudinaryContext>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default ImageGallery;