import React from 'react';
import { Form, Upload, Button, Icon } from 'antd';
import '../global-styles.css';
import axios from 'axios';

class SimpleUpload extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    normFile = (e) => {
        // if (Array.isArray(e)) {
        //   return e;
        // }
        console.log(e.file);
        axios.post('http://localhost:8080/api/postImage', e.file)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.warn(err);
            })
        return e && e.fileList;
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="formContainer">
                <Form.Item {...formItemLayout} >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload action="http://localhost:8080/api/postImage" listType="picture">
                            <Button>
                                <Icon type="upload" /> Upload images
                            </Button>
                        </Upload>
                )}
                </Form.Item>
            </Form>
        )
    }
}

const WrappedForm = Form.create({ name: 'file-upload' })(SimpleUpload)
export default WrappedForm;