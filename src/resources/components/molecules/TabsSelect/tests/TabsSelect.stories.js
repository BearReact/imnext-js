import React from 'react';
import {storiesOf} from '@storybook/react';

import TabsSelect from '../TabsSelect';

const languageOption = [
    {value: 'en-US', text: 'EN'},
    {value: 'zh-CN', text: '中文'}
];

const locale = 'zh-CN';

storiesOf('Molecules|TabsSelect', module)
    .add('default', () => (
        <div>
            {/*可以用styleComponent去包TabsSelect然後改TabsSelectRoot的樣式*/}
            <TabsSelect
                options={languageOption}
                value={locale}
                onChange={() => {}}
            />
        </div>
    ));
