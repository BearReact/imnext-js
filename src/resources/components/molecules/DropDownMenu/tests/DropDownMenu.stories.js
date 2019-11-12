import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Icon from '@components/atoms/Icon/Icon';
import DropDownMenu from '../DropDownMenu';

storiesOf('Molecules|DropDownMenu', module).add('default', () =>
    <div className="container" style={{marginTop: 200}}>
        <div className="row">
            <div className="col text-center">
                <DropDownMenu source={[
                    {text: <React.Fragment>
                        <Icon code="heart" color="#fff" size={20}/>
                        <span style={{marginLeft:5}}>Favourite</span>
                    </React.Fragment>
                    },
                    {text: <React.Fragment>
                        <Icon code="update" color="#fff" size={20}/>
                        <span style={{marginLeft:5}}>Refresh</span>
                    </React.Fragment>
                    ,
                    isDisabled: true}
                ]} />
            </div>
        </div>
        <div className="row">
            <div className="col text-center">
                <DropDownMenu
                    position="bottomCenter"
                    source={[
                        {text: (<React.Fragment>
                            <Icon code="heart" color="#fff" size={20}/>
                            <span style={{marginLeft:5}}>Favourite</span>
                        </React.Fragment>)
                        ,
                        onClick: action('click Heart')
                        },
                        {
                            text: (<React.Fragment>
                                <Icon code="update" color="#fff" size={20}/>
                                <span style={{marginLeft: 5}}>Refresh</span>
                            </React.Fragment>),
                            onClick: action('click update')
                        }
                    ]} />
            </div>
        </div>
    </div>
);
