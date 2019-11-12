// @flow
/**
 * MenuItem
 */
import React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import {px2vw} from '@utils/format';

import Icon from '@components/atoms/Icon';
import Button from '@components/atoms/Button/Button';
import TooltipsAnimate from '@components/atoms/Tooltips/TooltipsAnimate';

type Props = {
    position?: string,
    source?: Array<{
        text: string,
        onClick: Function,
        isDisabled: boolean
    }>,
};
type State = {};

class DropDownMenu extends React.PureComponent<Props, State> {
    static defaultProps = {
        source: [],
        position: 'topCenter'
    };

    state = {
        isOpen: false
    };

    handleToggle = () => {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});
    };

    render(){
        const {source, position} = this.props;
        const {isOpen} = this.state;

        return (
            <div className="d-inline-flex" style={{position: 'relative'}}>
                <Button onClick={this.handleToggle}>
                    <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                </Button>
                <TooltipsAnimate
                    isOpen={isOpen}
                    source={source}
                    position={position}
                >
                    {source.map(row => (
                        <ButtonItem
                            theme={!row.isDisabled ? 'primary' : 'gray'}
                            key={uniqueId('tooltip_')}
                            shape="raised"
                            onClick={() =>{
                                if(row.onClick){
                                    row.onClick();
                                }
                                this.handleToggle();
                            }}
                            disabled={row.isDisabled}
                        >
                            {row.text}
                        </ButtonItem>
                    ))}
                </TooltipsAnimate>

            </div>
        );
    }
}

export default DropDownMenu;


const ButtonItem = styled(Button)`
    justify-content: flex-start;
    min-height: ${px2vw(30)};
    position: relative;
    padding-bottom: ${px2vw(1)};
    
    font-weight: 400;
    font-size: ${px2vw(11)};
    white-space: nowrap;

    &:after {
        content: '';
        display: block;
        bottom: 0;
        position: absolute;
        left: 0;
        background-color: rgba(255, 255, 255, 0.5);
        width: 100%;
        height: 1px;
    }
    

    &:last-child {
        padding-bottom: 0;
        &:after {
            display: none;
        }
    }
`;

