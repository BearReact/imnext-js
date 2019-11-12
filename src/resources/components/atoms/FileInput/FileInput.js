// @flow
/**
 * Input
 */
import * as React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';

type Props = {
    onChange?: Function,
    value?: string,
    isBlock?: boolean,
    accept?: string,
    defaultTitle?: string
};
type State = {};

const inputId = uniqueId('fileInput_');

class FileInput extends React.PureComponent<Props, State> {
    static defaultProps = {
        onChange: () => {},
        value: '',
        isBlock: false,
        accept: '',
        defaultTitle: 'Choose'
    };

    handleChange = e => {
        const {onChange} = this.props;
        onChange(e);
    };

    render() {
        const {
            value,
            isBlock,
            defaultTitle,
            accept
        } = this.props;

        const fileName = value || defaultTitle;
        return (
            <InputRoot isBlock={isBlock}>
                <InputText htmlFor={inputId}>{fileName}</InputText>
                <FileUpload
                    onChange={this.handleChange}
                    type="file"
                    id={inputId}
                    accept={accept}
                />
            </InputRoot>
        );
    }
}

export default FileInput;



const FileUpload = styled.input`
    opacity: 0;
    visibility: hidden;
    max-width: 0;
`;

const InputRoot = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: ${props=> props.isBlock ? '100%' : 'auto'};
`;

const InputText = styled.label`
    color: ${props => props.color || props.theme.primaryColor};
    border: none;
    width: 100%;
    background-color: ${props => props.backgroundColor || 'transparent'};
    font-size: ${px2vw(14)};
    font-weight: 900;
    margin-bottom: 0;
    padding-left: ${px2vw(2)};
    text-overflow: ellipsis;
    overflow: hidden;
    
    @media ${screen.lg} {
        font-size: 14px;
        padding-left: 2px;
    }
`;
