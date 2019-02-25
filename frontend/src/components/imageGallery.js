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
            address: '',
        }
    }

    componentDidMount = async () => {
        axios.get("http://localhost:8080/api/gallery")
        .then(res => {
            this.setState({ gallery: res.data });
        })
        .catch(err => {
            console.error("Axios call: ",err);
        })
        
        let account = await window.ethereum.enable();
        this.setState({
            address: account,
        });
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
        const { gallery, address } = this.state;

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
                                data.file.public_id.includes("shutterStock") ?
                                <div key={data.file.public_id} className="container">
                                    <button onClick={() => this.showModal(data.file)} className="img">
                                        <div>
                                            <Image publicId={data.file.public_id}>
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
                                    {data.user === address ? // 
                                    <Modal
                                        title="Download"
                                        visible={this.state.isOpen[data.file.public_id]}
                                        onCancel={() => this.hideModal(data.file)}
                                        cancelButtonProps={() => this.hideModal(data.file)}
                                        zIndex="100"
                                        footer={[
                                            <Button key="back" onClick={() => this.hideModal(data.file)}>Back</Button>
                                        ]}
                                    >
                                        <p>Price: {data.ethPrice}</p>
                                        <p>Owner address: {data.user}</p>
                                        <a href={data.file.secure_url}>
                                            <Button>
                                                Click for secure link
                                            </Button>
                                        </a>
                                    </Modal>
                                    : 
                                    <Modal
                                        title="Download"
                                        visible={this.state.isOpen[data.file.public_id]}
                                        onCancel={() => this.hideModal(data.file)}
                                        cancelButtonProps={() => this.hideModal(data.file)}
                                        zIndex="100"
                                        footer={[
                                            <Button key="back" onClick={() => this.hideModal(data.file)}>Back</Button>
                                        ]}
                                    >
                                        <p>Price: {data.ethPrice}</p>
                                        <p>Owner address: {data.user}</p>
                                        <a href={data.file.secure_url}>
                                            <Button>
                                                Click for secure link
                                            </Button>
                                        </a>
                                    </Modal>
                                    }
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