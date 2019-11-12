import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components';
import BlockTitle from '@components/atoms/BlockTitle';
import List, {ListItem} from '@components/atoms/List';
import ScrollView from '../ScrollView';

const SampleItemList = [
    {title: 'item 1'},
    {title: 'item 2'},
    {title: 'item 3'},
    {title: 'item 4'},
    {title: 'item 5'},
    {title: 'item 6'},
    {title: 'item 7'},
    {title: 'item 8'},
    {title: 'item 9'},
    {title: 'item 10'},
    {title: 'item 11'},
    {title: 'item 12'},
    {title: 'item 13'},
    {title: 'item 14'},
    {title: 'item 15'},
    {title: 'item 16'},
    {title: 'item 17'},
    {title: 'item 18'},
    {title: 'item 19'},
    {title: 'item 20'},
    {title: 'item 21'}
];

storiesOf('Atoms|ScrollView', module).add('default', () => (
    <React.Fragment>
        <Row>
            <Col>
                <BlockTitle>Scroll View (需要靠Flexbox來自動高度)</BlockTitle>
            </Col>

            <ScrollView onScrollToTop={action('onScrollToTop')} onScrollToBottom={action('onScrollToBottom')}>
                <List>
                    {SampleItemList.map(row => (
                        <ListItem title={row.title} key={row.title} />
                    ))}
                </List>
            </ScrollView>
        </Row>
    </React.Fragment>
));

const Col = styled.div`
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 100%;
`;
