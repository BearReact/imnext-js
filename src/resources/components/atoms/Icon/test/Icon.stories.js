import React from 'react';
import {storiesOf} from '@storybook/react';
import styled from 'styled-components';
import IconList from '@assets/plugins/iconfont/iconfont.json';
import Icon from '../Icon';

let minCode = '';
storiesOf('Atoms|Icon', module).add('default', () => (
    <div className="container" style={{paddingTop: 20, paddingBottom: 20}}>
        <div className="row">
            <div className="col">
                <div style={{color: '#9ea2b0', paddingLeft: 10}}>
                    若更新 iconfont 請執行指令產生列表
                    <pre>$ yarn iconfont:css2json</pre>
                </div>
            </div>
        </div>
        <div className="row">
            {Object.keys(IconList).map(code => {
                minCode = code.replace('icon-', '');
                return (
                    <div className="col-8" key={minCode}>
                        <div>
                            <Icon code={minCode} size={40} color="#9ea2b0" />
                            <Text>{minCode}</Text>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
));

const Text = styled.div`
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin-bottom: 15px;
`;
