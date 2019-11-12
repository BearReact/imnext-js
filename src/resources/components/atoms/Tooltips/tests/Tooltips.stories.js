import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon from '@components/atoms/Icon/Icon';
import Button from '@components/atoms/Button/Button';
import BlockTitle from '@components/atoms/BlockTitle/BlockTitle';
import TooltipsAnimate from '@components/atoms/Tooltips/TooltipsAnimate';
import Tooltips from '../Tooltips';

class StateComponent extends React.Component {
    state = {
        isOpen: false
    };

    handleToggle = () => {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});
    };

    render(){
        const {isOpen} = this.state;

        return (
            <div className="d-inline-flex" style={{position: 'relative'}}>
                <Button onClick={this.handleToggle}>
                    <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                </Button>
                <TooltipsAnimate
                    isOpen={isOpen}
                    text="點我彈出也可改成CSS滑入顯示"
                    onClose={this.handleToggle}
                    position="topLeft"
                />
            </div>
        );
    }
}

storiesOf('Atoms|Tooltips', module)
    .add('default', () => (
        <div className="container-fluid" style={{paddingTop: 30}}>
            <a href="#" style={{color: '#fff'}}>[手機測試連結點我]</a>

            <div className="row">
                <div className="col text-right">
                    <div className="d-inline-flex" style={{position: 'relative'}}>
                        <Button>
                            <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                        </Button>
                        <Tooltips position="topLeft" text="position => TopLeft"/>
                    </div>
                </div>
            </div>

            <div className="row" style={{marginTop: 50}}>
                <div className="col text-center">
                    <div className="d-inline-flex" style={{position: 'relative'}}>
                        <Button>
                            <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                        </Button>
                        <Tooltips position="topCenter" text="position => TopCenter"/>
                    </div>
                </div>
            </div>

            <div className="row" style={{marginTop: 50}}>
                <div className="col">
                    <div className="d-inline-flex" style={{position: 'relative'}}>
                        <Button>
                            <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                        </Button>
                        <Tooltips position="topRight" text="position => TopRight"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="d-inline-flex" style={{position: 'relative'}}>
                        <Button>
                            <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                        </Button>
                        <Tooltips position="bottomRight" text="position => BottomRight"/>
                    </div>
                </div>
            </div>

            <div className="row" style={{marginTop: 50}}>
                <div className="col text-center">
                    <div className="d-inline-flex" style={{position: 'relative'}}>
                        <Button>
                            <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                        </Button>
                        <Tooltips position="bottomCenter" text="position => BottomCenter"/>
                    </div>
                </div>
            </div>

            <div className="row" style={{marginTop: 50}}>
                <div className="col text-right">
                    <div className="d-inline-flex" style={{position: 'relative'}}>
                        <Button>
                            <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                        </Button>
                        <Tooltips position="bottomLeft" text="position => BottomLeft"/>
                    </div>
                </div>
            </div>

            <div className="row" style={{marginTop: 50}}>
                <div className="col text-right">
                    <div className="d-inline-flex" style={{position: 'relative'}}>
                        <Button>
                            <Icon code="ellipsisv" color="#fff" size={24} isInline/>
                        </Button>
                        <Tooltips position="right" text="position => Right"/>
                    </div>
                </div>
            </div>

        </div>
    ))
    .add('with animation', () => (
        <div className="container-fluid" style={{paddingTop: 30}}>
            <a href="#" style={{color: '#fff'}}>[手機測試連結點我]</a>

            <BlockTitle>點選開啟控制+動畫</BlockTitle>
            <div className="row">
                <div className="col text-right">
                    <StateComponent/>
                </div>
            </div>
            <div className="row">
                <div className="col text-right text-primary">
                    參考 https://reactcommunity.org/react-transition-group/transition
                </div>
            </div>
        </div>
    ));
