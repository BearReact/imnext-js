import React from 'react';
import {storiesOf} from '@storybook/react';
import BlockTitle from '@components/atoms/BlockTitle';
import Accordion from '@components/atoms/Accordion/Accordion';
import AccordionItem from '@components/atoms/Accordion/AccordionItem';

storiesOf('Atoms|Accordion', module).add('default', () => (
    <React.Fragment>
        <BlockTitle>Deposit History List</BlockTitle>

        <Accordion>
            <AccordionItem
                title="iPAY Payment"
                time="18/06/2018 15:36:44"
                money={500}
                requestID="PTVV5C1806141567967"
                depositType="iPAY Payment"
                gamePlatform="Saba"
                status="SUCCESSFUL"
            />
            <AccordionItem
                title="OnlineBank Payment"
                time="18/06/2018 15:36:44"
                money={-500}
                requestID="PTVV5C1806141567967"
                depositType="iPAY Payment"
                gamePlatform="Saba"
                status="FAIL"
            />
            <AccordionItem
                title="iPAY Payment"
                time="18/06/2018 15:36:44"
                money={0}
                requestID="PTVV5C1806141567967"
                depositType="iPAY Payment"
                gamePlatform="Saba"
                status="SUCCESSFUL"
            />
        </Accordion>
    </React.Fragment>
));
