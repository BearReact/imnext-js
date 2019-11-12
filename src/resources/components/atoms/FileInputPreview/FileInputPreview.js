// @flow
/**
 * Input
 */
import * as React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';


import Icon from '@components/atoms/Icon';

type Props = {
    onChange?: Function,
    accept?: string
};
type State = {};

const inputId = uniqueId('fileInput_');

class FileInputPreview extends React.PureComponent<Props, State> {
    static defaultProps = {
        onChange: () => {},
        accept: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            imagePreviewUrl: ''
        };
    }

    // 預覽圖片
    handleImageChange(e) {
        const {onChange} = this.props;
        onChange(e);

        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    render() {
        const {
            accept
        } = this.props;

        const {imagePreviewUrl} = this.state;

        return (
            <Label htmlFor={inputId}>
                <ViewAdd
                    url={imagePreviewUrl}
                >
                    {isEmpty(imagePreviewUrl) && (<Icon code="plus" size={45} color='#cecece' />)}
                    <FileUpload
                        type="file"
                        id={inputId}
                        accept={accept}
                        onChange={(e) => this.handleImageChange(e)}
                    />
                </ViewAdd>
            </Label>
        );
    }
}

export default FileInputPreview;


const Label = styled.label`
    width: 100%;
`;

const ViewAdd = styled.div`
    position: relative;
    width: auto;
    height: ${px2vw(160)};
    background-color: #f1f1f1;
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    border: dashed 1px #979797;
    border-radius: 4px;
    background-image: url(${props => props.url});
    background-size: 100%;
    
    @media ${screen.lg} {
        height: 300px;
    }
`;

const FileUpload = styled.input`
    opacity: 0;
    visibility: hidden;
    max-width: 0;
`;
