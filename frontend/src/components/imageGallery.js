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
    };

    sendTransaction = async (data) => {
        const { address } = this.state;

        let params = [{
            "from": address[0],
            "to": data.user,
            "gas": "10000",
            "gasPrice": "1000",
            "value": (data.ethPrice * 1000000000000000).toString(),
        }];
        
        let txHash = await window.ethereum.sendAsync({
            method: 'eth_sendTransaction',
            params: params,
            from: address[0],
        }, (err, res) => {
            if (err) {
                console.warn('sendTransaction ERROR', err)
                return err;
            };
            return txHash;
        });
    };
    
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
                                    {!data.owners.includes(address[0]) ? // If user is an owner of the image
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
                                        <p>Price: {data.ethPrice} ETH</p>
                                        <p>Owner address: {data.user}</p>
                                        <Button onClick={() => this.sendTransaction(data)} type="primary">
                                            Purchase image
                                        </Button>
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
                                        <p>Creator address: {data.user}</p>
                                        <p>Title: {data.file.original_filename}</p>
                                        <p>Dimensions: {data.file.width}x{data.file.height}</p>
                                        <p>Format: {data.file.format.toUpperCase()}</p>
                                        <a href={data.file.secure_url}>
                                            <Button type="primary">
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