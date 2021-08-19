import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Card, CardHeader, CardBody, InputGroup, InputGroupAddon, InputGroupText, Input, CustomInput } from 'reactstrap';
// React Slider
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// Color picker
import { ChromePicker, SketchPicker, BlockPicker, TwitterPicker  } from 'react-color'
// React Select
import Select from 'react-select';
// Masked Input
import MaskedInput from 'react-maskedinput'
// DateTimePicker
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
// React Draft Wysiwyg
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// used for react slider
const marks = {
  '-10': '-10°C',
  0: <strong className="text-info">0°C</strong>,
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: {
    style: {
      color: 'red',
    },
    label: <strong>100°C</strong>,
  },
};

// used for react select
const STATES = [
    { value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' },
    { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' },
    { value: 'victoria', label: 'Victoria', className: 'State-Vic' },
    { value: 'queensland', label: 'Queensland', className: 'State-Qld' },
    { value: 'western-australia', label: 'Western Australia', className: 'State-WA' },
    { value: 'south-australia', label: 'South Australia', className: 'State-SA' },
    { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' },
    { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' },
]
// editor initial content
const blocksFromHTML = convertFromHTML('<p>Write something...</p>');
const initialEditorContent = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap
);

class FormExtended extends Component {
    state = {
        displayColorPicker: false,
        displayColorPickerInput: false,
        colorSelected: '#00AABB',

        selectedOption: '',
        selectedOptionMulti: [],

        card: '',
        expiry: '',
        ccv: '',

        editorState: EditorState.createWithContent(initialEditorContent)
    };

    colorpickerHandleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    colorpickerHandleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    colorpickerInputHandleClick = () => {
        this.setState({ displayColorPickerInput: !this.state.displayColorPickerInput })
    };

    colorpickerInputHandleClose = () => {
        this.setState({ displayColorPickerInput: false })
    };

    sliderLog(value) {
        console.log(value)
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    }
    handleChangeSelectMulti = (selectedOptionMulti) => {
        this.setState({ selectedOptionMulti });
        console.log(`Selected Multi: ${selectedOptionMulti.label}`);
    }

    onChangeMasked = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onEditorStateChange = editorState => {
        this.setState({ editorState })
    }

    render() {

        // used for color picker
        const popover = {
            position: 'absolute',
            zIndex: '302',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        // used for react select
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        const { selectedOptionMulti } = this.state;
        // editor
        const { editorState } = this.state;

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Form Extended
                        <small>New elements to extend the classic functions</small>
                    </div>
                </div>
                { /*  START card */ }
                <Card className="card-default">
                    <CardHeader>Form elements</CardHeader>
                    <CardBody>
                        <form method="get" action="#" className="form-horizontal">
                            <fieldset>
                                <legend>New Components</legend>
                                <div className="form-group row">
                                   <label className="col-md-2 col-form-label">Slider</label>
                                   <div className="col-md-4">
                                        <p>Basic Slider</p>
                                        <Slider onChange={this.sliderLog} />
                                        <p className="mt-2">Basic Slider，`step=20`</p>
                                        <Slider step={20} defaultValue={50} onBeforeChange={this.sliderLog} />
                                        <p className="mt-2">Basic Slider，`step=20, dots`</p>
                                        <Slider dots step={20} defaultValue={100} onAfterChange={this.sliderLog} />
                                   </div>
                                </div>
                                <div className="form-group row">
                                   <label className="col-md-2 col-form-label">Range</label>
                                   <div className="col-md-4">
                                        <p className="mt-2">Basic Range，`allowCross=false`</p>
                                        <Range allowCross={false} defaultValue={[0, 20]} onChange={this.sliderLog} />
                                        <p className="mt-2">Basic Range，`step=20` </p>
                                        <Range step={20} defaultValue={[20, 40]} onBeforeChange={this.sliderLog} />
                                        <p className="mt-2">Basic Range，`step=20, dots` </p>
                                        <Range dots step={20} defaultValue={[20, 40]} onAfterChange={this.sliderLog} />
                                   </div>
                                </div>
                                <div className="form-group row">
                                   <label className="col-md-2 col-form-label">Slider Vertical</label>
                                   <div className="col-md-4" style={{ overflow: 'hidden' }}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p className="mt-2">Slider with marks, `step=null`</p>
                                                <div className="mb-3" style={{height: 400}}>
                                                    <Slider vertical min={-10} marks={marks} step={null} onChange={this.sliderLog} defaultValue={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="mt-2">Slider with marks and steps</p>
                                                <div className="mb-3" style={{height: 400}}>
                                                    <Slider vertical dots min={-10} marks={marks} step={10} onChange={this.sliderLog} defaultValue={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-2 col-form-label">Switch Small</label>
                                    <Col md={ 10 }>
                                        <label className="switch switch-sm">
                                            <input type="checkbox" defaultChecked />
                                            <span></span>
                                        </label>
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-2 col-form-label">Switch</label>
                                    <Col md={ 10 }>
                                        <label className="switch">
                                            <input type="checkbox" defaultChecked />
                                            <span></span>
                                        </label>
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-2 col-form-label">Switch Large</label>
                                    <Col md={ 10 }>
                                        <label className="switch switch-lg">
                                            <input type="checkbox" defaultChecked />
                                            <span></span>
                                        </label>
                                    </Col>
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-md-2 col-form-label">Switch Radio</label>
                                    <Col md={ 10 }>
                                        <div className="d-flex flex-row">
                                            <label className="switch switch-lg mr-2">
                                                <input type="radio" defaultChecked name="radioSwitch" />
                                                <span></span>
                                            </label>
                                            <label className="switch switch-lg">
                                                <input type="radio" name="radioSwitch" />
                                                <span></span>
                                            </label>
                                        </div>
                                    </Col>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row mb">
                                    <label className="col-md-2 col-form-label">Color picker</label>
                                    <Col sm={ 8 }>
                                        <Row>
                                            <Col xs={ 12 }>
                                                <p>Chrome colorpicker on button popup</p>
                                                <button type="button" className="btn btn-secondary" onClick={ this.colorpickerHandleClick }>Pick Color</button>
                                                { this.state.displayColorPicker ? <div style={ popover }>
                                                  <div style={ cover } onClick={ this.colorpickerHandleClose }/>
                                                  <ChromePicker />
                                                </div> : null }
                                            </Col>
                                            <Col xs={ 12 }>
                                                <p className="mt-3">Using an input</p>
                                                <InputGroup className="colorpicker-component demo-colorpicker">
                                                    <Input value={this.state.colorSelected} onChange={()=>{}} onFocus={ this.colorpickerInputHandleClick }/>
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText><i className="icon-pin"></i></InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                { this.state.displayColorPickerInput ? <div style={ popover }>
                                                  <div style={ cover } onClick={ this.colorpickerInputHandleClose }/>
                                                  <SketchPicker color={this.state.colorSelected} onChange={color => this.setState({colorSelected: color.hex})}/>
                                                </div> : null }
                                            </Col>
                                            <Col xs={ 12 } className="mt-3">
                                                <Row>
                                                    <Col xs={ 6 }>
                                                        <p>SketchPicker</p>
                                                        <SketchPicker />
                                                    </Col>
                                                    <Col xs={ 6 }>
                                                        <p>Block</p>
                                                        <BlockPicker/>
                                                        <p className="mt-2">Twitter</p>
                                                        <TwitterPicker/>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row mb">
                                    <label className="col-md-2 col-form-label">React Select</label>
                                    <Col md={ 10 }>
                                        <p>Basic Select</p>
                                        <Select
                                            name="select-name"
                                            value={value}
                                            onChange={this.handleChangeSelect}
                                            options={STATES}
                                        />
                                        <p className="mt-2">Multi Select</p>
                                        <Select
                                            name="multi-select-name"
                                            multi
                                            simpleValue
                                            value={selectedOptionMulti}
                                            onChange={this.handleChangeSelectMulti}
                                            options={STATES}
                                        />
                                    </Col>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Masked input</label>
                                    <Col md={ 10 }>
                                        <p>Card Number:{' '}</p>
                                        <MaskedInput className="form-control" mask="1111 1111 1111 1111" name="card" size="20" onChange={this.onChangeMasked}/>
                                        <p className="mt-2">Expiry Date:{' '}</p>
                                        <MaskedInput className="form-control" mask="11/1111" name="expiry" placeholder="mm/yyyy" onChange={this.onChangeMasked}/>
                                        <p className="mt-2">CCV:{' '}</p>
                                        <MaskedInput className="form-control" mask="111" name="ccv" onChange={this.onChangeMasked}/>
                                        <p className="mt-2">Escaped:</p>
                                        <MaskedInput className="form-control" mask="11 \* 11" name="escaped" id="escaped" onChange={this.onChangeMasked}/>
                                        <div className="text-sm text-muted">Mask placeholder characters can be escaped with a leading <code>\</code> to use them as static contents</div>
                                        <p className="mt-2">Leading:</p>
                                        <MaskedInput className="form-control" mask="(0) 111 1111" name="leading" id="leading" onChange={this.onChangeMasked}/>
                                        <div className="text-sm text-muted">Leading static characters</div>
                                    </Col>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row mb">
                                    <label className="col-md-2 col-form-label mb">DateTimePicker</label>
                                    <Col md={ 10 }>
                                        <p>Basic</p>
                                        <Datetime inputProps={{className: 'form-control'}}/>
                                        <p className="mt-2">Date Format YYYY-MM</p>
                                        <Datetime dateFormat="YYYY-MM" timeFormat={false} inputProps={{className: 'form-control'}}/>
                                        <p className="mt-2">Time picker only</p>
                                        <Datetime inputProps={{className: 'form-control'}} dateFormat={false} />
                                    </Col>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">File input</label>
                                    <Col md={ 10 }>
                                        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
                                    </Col>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Block Note Editor</label>
                                    <Col md={ 10 }>
                                        <Card body>
                                            <textarea rows="10" className="form-control note-editor"></textarea>
                                        </Card>
                                        <p>With margin</p>
                                        <Card body>
                                            <textarea rows="10" className="form-control note-editor note-editor-margin"></textarea>
                                        </Card>
                                    </Col>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Simple wysiwyg</label>
                                    <Col md={ 10 }>
                                        <Editor
                                            editorState={editorState}
                                            wrapperClassName="wysiwig-editor-wrapper"
                                            editorClassName="form-control"
                                            editorStyle={{height: 300}}
                                            onEditorStateChange={this.onEditorStateChange}
                                        />
                                        <p className="mt-3">JSON OUTPUT</p>
                                        <p dangerouslySetInnerHTML={{__html: JSON.stringify(convertToRaw(editorState.getCurrentContent()))}}></p>
                                    </Col>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row">
                                    <div className="col-sm-4 col-sm-offset-2">
                                        <button type="submit" className="btn btn-secondary">Cancel</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </CardBody>
                </Card>
                { /*  END card */ }
            </ContentWrapper>
            );
    }

}

export default FormExtended;
