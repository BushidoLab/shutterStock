import React from 'react';
import axios from 'axios';

import { Button } from "antd";

const POSTRECORD_URL = "http://localhost:8080/api/createRecord";
let accounts;
let txHash;

class CloudinaryWidget extends React.Component {
    componentDidMount() {
        this.getMetamask();
    }

    getMetamask = async () => {
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            // const provider = window['ethereum'] || window.web3.currentProvider
        }
        accounts = await window.ethereum.enable();
    }

    showWidget = async () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "diegolealb",
            uploadPreset: "default_preset",
            multiple: false,
            clientAllowedFormats: ["png", "jpg"],
            showAdvancedOptions: true,
            showCompletedButton: true,
            singleUploadAutoClose: false,
        }, (error, result) => {
            if (result.event === 'success') {
                try {
                    this.checkUploadResult(result);
                    this.sendTransaction(result);
                } catch (err) {
                    console.error(err);
                }
            }
        });
        widget.open();
    }


    sendTransaction = async (result) => {
        let params = [{
            "from": accounts[0],
            "to": "0x4fc03322307e64842c841198750be5839e815ca7",
            "gas": "30400",
            "gasPrice": "1000",
            "value": "1",
        }];
        
        txHash = await window.ethereum.sendAsync({
            method: 'eth_sendTransaction',
            params: params,
            from: accounts[0], // Provide the user's account to use.
        }, (err, res) => {
            if (err) {
                console.err(err)
                return;
            };
            console.log(res);
            this.postRequest(result, res.result, accounts[0]); 
        })
    }

    checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {}
        console.log('resultEvent: ', resultEvent);
    };

    postRequest = (payload, txHash, user) => {
        payload = { user, txHash, ...payload };
        axios.post(POSTRECORD_URL, payload)
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
            <Button type = "primary" onClick = { this.showWidget }>
                Add Image
            </Button> 
        </div>
        )
    }
}


export default CloudinaryWidget;