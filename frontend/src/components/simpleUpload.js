import React from 'react';
import { Form, Upload, Button, Icon, message, Input, Modal } from 'antd';
import reqwest from 'reqwest';
import axios from 'axios';

import '../global-styles.css';

const info = Modal.info;
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/diegolealb/upload";
const saveRecordUrl = "http://localhost:8080/api/createRecord";

class SimpleUpload extends React.Component {
    state = {
        file: '',
        account: '',
        uploading: false,
        price: 0,
    };

    componentWillMount = () => {
        this.getMetamask()
            .then(accounts => {
                this.setState({
                    account: accounts,
                })
            })
    };

    handleUpload = () => {
        const { file } = this.state;
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'default_preset');
        
        reqwest({
            url: cloudinaryUrl,
            method: 'post',
            processData: false,
            data: formData,
            success: (res) => {
                this.setState({
                    file: '',
                    uploading: false,
                });
                message.success('Uploaded successfully');
                this.createRecord(res);
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('Upload failed')
            }
        });
    };

    createRecord = (file) => {
        const { price, account } = this.state;
        const requestBody = {
            file: file,
            user: account,
            ethPrice: price,
        };

        axios.post(saveRecordUrl, requestBody)
            .then(res => {
                console.log('MongoDB response', res);
            })
            .catch(err => {
                console.warn(err);
            });
    };

    getMetamask = async () => {
        return await window.ethereum.enable();
    };

    sendTransaction = async (accounts) => {
        let params = [{
            "from": accounts[0],
            "to": "0x4fc03322307e64842c841198750be5839e815ca7",
            "gas": "30400",
            "gasPrice": "1000",
            "value": "1000000000000000",
        }];
        
        let txHash = await window.ethereum.sendAsync({
            method: 'eth_sendTransaction',
            params: params,
            from: accounts[0], // Provide the user's account to use.
        }, (err, res) => {
            if (err) {
                console.warn(err)
                return err;
            };
            return txHash;
        });
    };

    selectPrice = async (file) => {
        const { uploading, account } = this.state;

        info({
            title: 'Select a price for this image in ETH',
            content: (
            <Form onSubmit={this.handleUpload}>
                <label>
                    Address
                </label>
                <Input disabled value={account} style={{ margin: '10px, 0' }}/>
                <label>
                    Price
                </label>
                <Input onChange={this.handlePriceChange} type="number"/>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={file === ''}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    { uploading ? 'Uploading' : 'Upload' }
                </Button>
            </Form>
            ),
            okText: "Close",
        });   
    };

    handlePriceChange = (e) => {
        let value = e.target.value;
        this.setState({
            price: value,
            uploading: false,
        });
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        const { file } = this.state;
        const props = {
            onRemove: () => {
                this.setState({
                    file: '',
                })
            },
            beforeUpload: (file) => {
                this.setState({
                    file: file,
                });
                this.selectPrice();
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
                        </React.Fragment>
                )}
                </Form.Item>
            </Form>
        )
    };
};

const WrappedForm = Form.create({ name: 'file-upload' })(SimpleUpload)
export default WrappedForm;