import React from 'react';

import { Button } from "antd";

class CloudinaryWidget extends React.Component {
    showWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "diegolealb",
            uploadPreset: "default_preset"
        }, (error, result) => {
            this.checkUploadResult(result);
        });
        widget.open();
    }

    checkUploadResult = (resultEvent) => {	
        if (resultEvent.event === "success") {	
            console.log('resultEvent: ', resultEvent);		
        }	
        console.log(resultEvent)	
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showWidget}>Add Image</Button>
            </div>
        )
    }
}

export default CloudinaryWidget;
