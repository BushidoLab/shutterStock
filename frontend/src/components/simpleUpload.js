import React from 'react';
import { Form, Upload, Button, Icon, message } from 'antd';
import '../global-styles.css';
// import axios from 'axios';
import reqwest from 'reqwest';

class SimpleUpload extends React.Component {
    state = {
        file: '',
        uploading: false,
    }

    handleUpload = () => {
        const { file } = this.state;
        const formData = new FormData();
        const url = "https://api.cloudinary.com/v1_1/diegolealb/upload";

        formData.append('file', file);
        formData.append('upload_preset', 'default_preset');

        this.setState({
            uploading: true,
        });
        
        reqwest({
            url: url,
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    file: '',
                    uploading: false,
                });
                message.success('Uploaded successfully');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('Upload failed')
            }
        });
    };

    getMetamask = async () => {
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            // const provider = window['ethereum'] || window.web3.currentProvider
        }
        let accounts = await window.ethereum.enable();
        return accounts;
    };

    sendTransaction = async (accounts) => {
        let params = [{
            "from": accounts[0],
            "to": "0x4fc03322307e64842c841198750be5839e815ca7",
            "gas": "30400",
            "gasPrice": "1000",
            "value": "1",
        }];
        
        let txHash = await window.ethereum.sendAsync({
            method: 'eth_sendTransaction',
            params: params,
            from: accounts[0], // Provide the user's account to use.
        }, (err, res) => {
            if (err) {
                console.err(err)
                return;
            };
            console.log(res);
            // this.postRequest(result, res.result, accounts[0]); 
        })
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        const { uploading, file } = this.state;
        const props = {
            onRemove: () => {
                this.setState({
                    file: '',
                })
            },
            beforeUpload: (file) => {
                this.getMetamask()
                    .then(accounts => {
                        this.sendTransaction(accounts);
                    })
                this.setState({
                    file: file,
                });
                return false;
            },
            file,
        };

        return (
            <Form onSubmit={this.handleUpload} className="formContainer">
                <Form.Item {...formItemLayout} >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                    })(
                        <React.Fragment>
                            <Upload {...props} listType="picture" accept=".jpg, .jpeg, .png">
                                <Button>
                                    <Icon type="upload" /> Select image
                                </Button>
                            </Upload>
                            <Button
                                type="primary"
                                onClick={this.handleUpload}
                                disabled={file === ''}
                                loading={uploading}
                                style={{ marginTop: 16 }}
                            >
                                {uploading ? 'Uploading' : 'Start Upload' }
                            </Button>
                        </React.Fragment>
                )}
                </Form.Item>
            </Form>
        )
    }
}

const WrappedForm = Form.create({ name: 'file-upload' })(SimpleUpload)
export default WrappedForm;