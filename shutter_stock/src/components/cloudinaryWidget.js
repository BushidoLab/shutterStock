import React from 'react';

import { Button } from "antd";

class CloudinaryWidget extends React.Component {
    showWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "diegolealb",
            uploadPreset: "default_preset"
        });
        widget.open();
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
