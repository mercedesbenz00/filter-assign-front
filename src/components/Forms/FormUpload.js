import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Row, Col } from 'reactstrap';
import Dropzone from 'react-dropzone';

class FormUpload extends Component {

    state = {
        files: []
    }

    onDrop = acceptedFiles => {
        this.setState({
            files: acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        });
    };

    createImageItem = (file, index) => (
        <Col md={3} key={index}>
            <img className="img-fluid mb-2" src={file.preview} alt="Item"/>
        </Col>
    )

    render() {
        let allFiles = this.state.files;
        return (
            <ContentWrapper>
                <Container className="container-md">
                    <p className="text-center">Dropzone<br/><small>DropzoneJS is an open source library that provides drag&apos;n&apos;drop file uploads with image previews.</small><br/><small className="spr">It’s lightweight, doesn’t depend on any other library (like jQuery) and is</small><small><a href="http://www.dropzonejs.com/" rel="noopener noreferrer" target="_blank"> highly customizable</a></small></p>
                    <Dropzone className="card p-3" ref="dropzone" onDrop={this.onDrop} >
                        <div className="text-center box-placeholder m-0">Try dropping some files here, or click to select files to upload.</div>
                        <div className="mt-3">
                            {this.state.files.length > 0 ?
                                <Row>{allFiles.map(this.createImageItem)}</Row>
                                :
                                <div><small>This demo does not upload files to any server.</small></div>
                            }
                        </div>
                    </Dropzone>
                </Container>
            </ContentWrapper>
            );
    }

}

export default FormUpload;
