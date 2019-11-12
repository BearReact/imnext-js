import React from 'react';
import {createForm, formShape} from 'rc-form';
import get from 'lodash/get';
import {storiesOf} from '@storybook/react';

import BlockTitle from '@components/atoms/BlockTitle';
import Button from '@components/atoms/Button/Button';
import FileInput from '../FileInput';

class StateComponent extends React.PureComponent {
    /**
     * 送出表單
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const {
            // eslint-disable-next-line react/prop-types
            form
        } = this.props;
        form.validateFields((error, value) => {
            if (error) {
                const key = Object.keys(error)[0];
            } else {
                const data = new FormData();
                data.append('file', value.attachment.target.files[0]);
                fetch('/post.htm', {
                    method: 'post',
                    body: data
                });

            }
        });
    };


    render() {
        const {
            // eslint-disable-next-line react/prop-types
            form: {getFieldDecorator}
        } = this.props;


        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {getFieldDecorator('attachment', {
                        getValuePrpos: value => {
                            return get(value, 'target', value);
                        },
                        getValueFromEvent: ({target}) => {
                            return {target};
                        }
                    })(<FileInput />)}
                </div>
                <Button
                    block
                    theme="primary"
                    type="submit"
                >
                    SUBMIT
                </Button>
            </form>
        );
    }
}
const StoryComponent = createForm()(StateComponent);


storiesOf('Atoms|FileInput', module).add('default', () => (
    <React.Fragment>
        <BlockTitle>Login Form</BlockTitle>
        <div className="container-fluid">
            <div className="row">
                <div className="col-24 pb-3">
                    <StoryComponent/>
                </div>
            </div>
        </div>

    </React.Fragment>
));
