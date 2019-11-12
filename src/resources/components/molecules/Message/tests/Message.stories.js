import React from 'react';
import {storiesOf} from '@storybook/react';
import Message from '../Message';

storiesOf('Molecules|Message', module).add('default', () => (
    <div className="container" style={{backgroundColor: '#f2f4fa'}}>
        <div className="row">
            <div className="col" style={{paddingTop: 20}}>
                <Message
                    authorType="system"
                    content="Dear member, Hello, the recent fight has become one of the most popular sports events in Asia. After supporting the sports competition, Aibo Entertainment sponsored the Malaysian Asian Fighting Championships in Kuala Lumpur, and invited all members of Aibo to participate in the event. Strong bloggers!"
                    createTime="15:20:15"
                />
                <Message
                    authorType="user"
                    content="Ok, I know there is such an event.Thank you."
                    createTime="15:20:15"
                />
            </div>
        </div>
    </div>
));
