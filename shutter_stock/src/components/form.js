import React from "react";
import axios from "axios";
import {
    Image,
    Transformation,
    CloudinaryContext
} from "cloudinary-react";

import { Button, Modal } from "antd";
import "./form.css";

// Format for api calls is https://<apiKey>:<apiSecret>@api.cloudinary.com/<path>
// const CLOUDINARY_URL="https://684518815981178:28_JNXsgqpczG-2Rl4cCd4oZ1PM@api.cloudinary.com/v1_1/diegolealb/resources/image";

class ImageUploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: [],
            modalVisible: false,
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080", {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(res => {
            this.setState({ gallery: res.data });
        })
        .catch(err => {
            console.error("Axios call: ",err);
        })
    }
    
    showModal = () => {
        this.setState({
            modalVisible: true,
        })
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        })
    }

    // checkUploadResult = (resultEvent) => {
    //     if (resultEvent.event === "success") {
    //         console.log(this.props.currentUser.id);
    //         this.props.postPhoto({user_id: this.props.currentUser.id,
    //         caption: "",
    //         url: resultEvent.info.secure_url})
    //           .then(this.props.history.push("/profile"))
    //     }
    //     console.log(resultEvent)
    // }

    showWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "diegolealb",
            uploadPreset: "default_preset"
        }, (error, result) => { 
            // this.checkUploadResult(result) 
        });
        widget.open();
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
        console.log(gallery);

        if (gallery.length !== 0) {
            return (
                <div className="mainContainer">
                    <h1>Gallery</h1>
                    <Button type="primary" onClick={this.showWidget}>Add Image</Button>
                    <CloudinaryContext cloudName="diegolealb">
                        <div className="imageContainer">
                        {gallery.map(data => {
                            return (
                                data.public_id.includes("shutterStock") ?
                                <div key={data.public_id} className="container">
                                    <div className="img">
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

function imageModal(data) {
    Modal.info({
        title: data.public_id,
        content: (
            <div>
                <img src={data.secure_url} alt={data.public_id}/>
            </div>
        )
    })
}

export default ImageUploadForm;