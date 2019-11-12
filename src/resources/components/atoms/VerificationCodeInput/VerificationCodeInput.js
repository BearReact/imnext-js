// @flow
/**
 * VerificationCodeInput
 */
import * as React from 'react';
import styled from 'styled-components';
import {px2vw} from '@utils/format';
import screen from '@themes/Screen';


type Props = {
    style?: React.CSSProperties,
    className?: string,
    length?: length,
    onChange?: Function
};
type State = {};

class VerificationCodeInput extends React.PureComponent<Props, State> {
    static defaultProps = {
        style: undefined,
        className: undefined,
        length: 7,
        onChange: undefined
    };

    constructor(props){
        super(props);

        const {length} = props;

        // 建立需要的Input
        this.serialRef = [];
        for(let i=0; i<length; i += 1){
            this.serialRef[i] = React.createRef();
        }
    }


    /**
     * 異動事件(提供父元件取值)
     */
    handleChange = () => {
        const {onChange, length} = this.props;

        if(onChange){
            let valueArray = [];
            for(let i=0; i<length; i += 1) {
                valueArray.push(this.serialRef[i].current.value);
            }
            onChange(valueArray.join(''));
        }

    };

    /**
     * 移標自動移動到最後一個未填寫的位置
     */
    handleFocusLast = () => {
        const {length} =this.props;
        let last = -1;
        this.serialRef.map((o, index) => {
            if(o.current.value !== ''){
                last = index;
            }
            return true;
        });

        const focusIndex = last+1 === length ? last : last + 1;
        this.serialRef[focusIndex].current.focus();
    };

    /**
     * 敲入內容前進
     * @param index
     */
    handleNextInput = (index) => {
        const {length} = this.props;
        if(index+1 < length){
            this.serialRef[index+1].current.focus();
            this.serialRef[index+1].current.value = '';
        }
    };

    /**
     * 刪除內容倒退
     * @param e
     * @param index
     */
    handleBackInput = (e, index) => {
        const {length} = this.props;
        if(e.keyCode === 8){
            e.preventDefault();
            if(index > 0) {
                if (index + 1 === length && this.serialRef[index].current.value !== '') {
                    this.serialRef[index].current.value = '';
                } else {
                    this.serialRef[index - 1].current.focus();
                    this.serialRef[index - 1].current.value = '';
                }
            }
        }
    };

    render(){
        const {className, style, length} = this.props;

        let input = [];
        for(let i=0; i<length; i += 1){
            const component = (
                <SerialInput
                    key={`SerialInput_${i}`}
                    ref={this.serialRef[i]}
                    maxLength={1}
                    onClick={this.handleFocusLast}
                    onKeyUp={this.handleChange}
                    onChange={()=>this.handleNextInput(i)}
                    onKeyDown={e => this.handleBackInput(e, i)}/>
            );

            input.push(component);
        }

        return (
            <VerificationCodeInputRoot className={className} style={style}>
                {input}
            </VerificationCodeInputRoot>
        );
    }
}

export default VerificationCodeInput;



const SerialInput = styled.input`
    width: ${px2vw(30)};
    background-color: transparent;
    padding: 0;
    border: none;
    border-radius: 0;
    border-bottom: solid 2px ${props => (props.value !== '' ? props.theme.primaryColor : '#fff')};
    color: ${props => props.theme.primaryColor};
    font-size: ${px2vw(20)};
    margin: ${px2vw(5)}; 
    text-align: center;   
    
    @media ${screen.lg} {
        font-size: 20px;
        margin: 5px 0;
        width: 30px;
    }
`;

const VerificationCodeInputRoot = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;
