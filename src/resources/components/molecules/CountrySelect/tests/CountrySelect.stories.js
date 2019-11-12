import React from 'react';
import {createForm} from 'rc-form';
import isEmpty from 'lodash/isEmpty';

import {storiesOf} from '@storybook/react';
import countryCode from '@config/countryCode';
import FormSelect from '../CountrySelect';

const optionList = ['+886', '+86', '+60', '+65'];

class StateComponent extends React.PureComponent {
    /**
     * 設定電話國碼的下拉選單格式
     * @returns {*}
     */
    getCountryPickerOption = () => {
        let option = [];
        if(!isEmpty(optionList)){

            option = countryCode
                .filter(row => optionList.indexOf(row.value) !== -1)
                .map((row,index) => ({
                    value: index,
                    text: row.text,
                    icon: row.icon,
                    code: row.value
                }));
        }

        return option;
    };

    render() {
        const {
            // eslint-disable-next-line react/prop-types
            form: {getFieldDecorator}
        } = this.props;

        return (
            <div>
                {getFieldDecorator('select', {
                    initialValue: 3
                })(<FormSelect
                    title="国籍号码"
                    whileCountryCodeList={this.getCountryPickerOption()}
                />)}
            </div>
        );
    }
}

const StoryComponent = createForm()(StateComponent);

storiesOf('Molecules|CountrySelect', module).add('with formSelect', () =>
    <div className="container pt-2">
        <div className="row">
            <div className="col-24 mb-2">
                <StoryComponent />
            </div>
        </div>
    </div>
);
