import React from 'react';
import {storiesOf} from '@storybook/react';
import ProgressBar from '../ProgressBar';

class StateComponent extends React.Component<> {
    state = {
        progress: 50
    };

    render() {
        const {progress} = this.state;
        return (
            <div>
                <div className="pb-3">
                    <ProgressBar progress={progress} />
                </div>
                <div className="pb-3">
                    <button type="button" onClick={() => this.setState({progress: 100})}>
                        前進99%
                    </button>
                </div>
                <div className="pb-3">
                    <button type="button" onClick={() => this.setState({progress: 10})}>
                        退到10%
                    </button>
                </div>
            </div>
        );
    }
}

storiesOf('Atoms|ProgressBar', module).add('default', () => (
    <div className="container">
        <div className="col" style={{paddingTop: 15}}>
            <ProgressBar
                needRollingAmount={50000}
                currentRollingAmount={35000}
                isShowProgressNumber
            />
        </div>
        <div className="col" style={{paddingTop: 15}}>
            <ProgressBar
                progress={50}
                isShowProgressText
            />
        </div>
        <div className="col" style={{paddingTop: 15}}>
            <ProgressBar
                theme='gray'
                progress={68}
            />
        </div>
        <div className="col" style={{paddingTop: 15}}>
            <StateComponent />
        </div>
    </div>
));
