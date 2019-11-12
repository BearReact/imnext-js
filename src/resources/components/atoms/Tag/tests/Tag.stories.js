import React from 'react';
import {storiesOf} from '@storybook/react';
import BlockTitle from '@components/atoms/BlockTitle';
import Tag from '../Tag';

storiesOf('Atoms|Tag', module).add('default', () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-24 p-0">
                <BlockTitle>Tag</BlockTitle>
            </div>

            <div className="col-8">
                <Tag theme="primary">Primary</Tag>
            </div>

            <div className="col-8">
                <Tag theme="danger">Danger</Tag>
            </div>

            <div className="col-8">
                <Tag theme="warning">Warning</Tag>
            </div>
        </div>
    </div>
));
