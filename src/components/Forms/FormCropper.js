import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Row, Col } from 'reactstrap';
import $ from 'jquery';
// Image Cropper
import 'cropper/dist/cropper.css';
import 'cropper/dist/cropper.js';

class FormCropper extends Component {

    componentDidMount() {
        // var self = this;

        this.inputImage = $(this.refs.inputImage); // upload button
        this.cropperElement = $(this.refs.cropperImage); // image for cropper

        this.options = {
            aspectRatio: 16 / 9,
            preview: '.img-preview',
            crop: function(data) {
                // console.log(self.cropperElement.cropper('getCroppedCanvas').toDataURL()); // base64
                console.log('Data X: ' + (Math.round(data.x)));
                console.log('Data Y: ' + (Math.round(data.y)));
                console.log('Data Height: ' + (Math.round(data.height)));
                console.log('Data Width: ' + (Math.round(data.width)));
                console.log('Data Rotate: ' + (Math.round(data.rotate)));
            }
        };

        // init plugin
        this.cropperElement.cropper(this.options);

        // prepare to handle image upload
        this.handleNewImage();

    }

    handleNewImage() {
        var self = this;
        var URL = window.URL || window.webkitURL,
            blobURL;

        if (URL) {
            this.inputImage.change(function() {
                var files = this.files,
                    file;

                if (!self.cropperElement.data('cropper')) {
                    return;
                }

                if (files && files.length) {
                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                        blobURL = URL.createObjectURL(file);
                        self.cropperElement.one('built.cropper', function() {
                            URL.revokeObjectURL(blobURL); // Revoke when load complete
                        }).cropper('reset').cropper('replace', blobURL);
                        self.inputImage.val('');
                    } else {
                        alert('Please choose an image file.');
                    }
                }
            });
        } else {
            this.inputImage.parent().remove();
        }
    }

    componentWillUnmount() {
        this.cropperElement.cropper('destroy');
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Image Cropper
                        <small>Simple image cropping plugin.</small>
                    </div>
                </div>
                <Container>
                    <Row>
                        <Col lg={ 8 }>
                            <div className="img-container mb-lg">
                                <img ref="cropperImage" src="img/mb-sample.jpg" alt="Sample" />
                            </div>
                        </Col>
                        <Col lg={ 4 }>
                            <div className="docs-preview clearfix">
                                <div className="img-preview preview-lg"></div>
                                <div className="img-preview preview-md"></div>
                                <div className="img-preview preview-sm"></div>
                                <div className="img-preview preview-xs"></div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt">
                        <Col lg={ 4 }>
                            <label htmlFor="inputImage" title="Upload image file" className="btn btn-info btn-upload">
                                <input ref="inputImage" id="inputImage" name="file" type="file" accept="image/*" className="sr-only" />
                                <span title="Import image with Blob URLs" className="docs-tooltip">
                                Upload image
                                </span>
                            </label>
                        </Col>
                    </Row>
                </Container>
            </ContentWrapper>
            );
    }

}

export default FormCropper;
