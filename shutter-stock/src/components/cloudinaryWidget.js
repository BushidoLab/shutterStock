import React from 'react';
import axios from 'axios';

import { Button } from "antd";

const URL="http://localhost:8080/api/createRecord";
class CloudinaryWidget extends React.Component {
    showWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "diegolealb",
            uploadPreset: "default_preset"
        }, (error, result) => {
            this.checkUploadResult(result);
            if (result.event === 'success') {
                this.postRequest(result);
            }
        });
        console.log(widget);
        widget.open();
    }

    checkUploadResult = (resultEvent) => {	
        if (resultEvent.event === "success") {	
        }	
        console.log('resultEvent: ', resultEvent);		
    };

    postRequest = (payload) => {
        axios.post(URL, payload)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showWidget}>Add Image</Button>
            </div>
        )
    }
}


export default CloudinaryWidget;
