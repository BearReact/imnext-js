import React from 'react';
import {storiesOf} from '@storybook/react';
import {createForm} from 'rc-form';

import ListSelect from '../ListSelect';

class StateComponent extends React.PureComponent {
    render() {
        const {
            // eslint-disable-next-line react/prop-types
            form: {getFieldDecorator}
        } = this.props;

        const optionList = [
            {value: '', text: 'No deposit account selected'},
            {value: 3, text: 'PAST ****_****_****-1235'},
            {value: 4, text: 'PAST ****_****_****-5568'},
            {value: 5, text: 'PAST ****_****_****-9876'}
        ];

        return (
            <div>
                {getFieldDecorator('select', {
                    initialValue: 3
                })(<ListSelect options={optionList} />)}
            </div>
        );
    }
}

const StoryComponent = createForm()(StateComponent);

storiesOf('Atoms|Select', module).add('ListSelect', () => <StoryComponent />);
