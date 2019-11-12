import React from 'react';
import {storiesOf} from '@storybook/react';
import BlockTitle from '@components/atoms/BlockTitle';
import CircleProgressBar from '../CircleProgressBar';

storiesOf('Atoms|CircleProgressBar', module).add('default', () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-24 p-0">
                <BlockTitle>Circle Progress Bar</BlockTitle>
            </div>

            <div className="col-12 my-1">
                <CircleProgressBar
                    circleBG1="#a06718"
                    circleBG2="#B07914"
                    circleBG3="#eab707"
                    numTitle={60}
                    unitTitle="秒"
                    index="1"
                />
            </div>
            <div className="col-12 my-1">
                <CircleProgressBar
                    circleBG1="#a06718"
                    circleBG2="#B07914"
                    circleBG3="#eab707"
                    numTitle={39}
                    unitTitle="秒"
                    index="2"
                />
            </div>
            <div className="col-12 my-1">
                <CircleProgressBar
                    circleBG1="#a06718"
                    circleBG2="#B07914"
                    circleBG3="#eab707"
                    numTitle={90}
                    unitTitle="秒"
                    index="3"
                />
            </div>
            <div className="col-12 my-1">
                <CircleProgressBar
                    circleBG1="#a1c4fd"
                    circleBG2="#B0D4FD"
                    circleBG3="#c2e9fb"
                    numTitle={70}
                    unitTitle="秒"
                    index="4"
                />
            </div>
        </div>
    </div>
));
