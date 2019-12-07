import React from 'react';
import {storiesOf} from '@storybook/react';
import ProgressBar from '../ProgressBar';

class StateComponent extends React.Component<> {
    state = {
        progress: 50,
    };

    render() {
        const {progress} = this.state;
        return (
            <div>
                <div className="pb-3">
                    <ProgressBar progress={progress} isVisibleProgressText/>
                </div>
                <div className="pb-3">
                    <button type="button" className="btn btn-xl" style={{width: 200, height: 200, background: 'green'}} onClick={() => this.setState({progress: progress + 10})}>
                        前進10%
                    </button>
                </div>
                <div className="pb-3">
                    <button type="button" className="btn btn-xl" style={{width: 200, height: 200, background: 'red'}} onClick={() => this.setState({progress: progress - 10})}>
                        後退10%
                    </button>
                </div>
            </div>
        );
    }
}

storiesOf('Atoms|ProgressBar', module).add('default', () => (
    <div className="container">
        {/* <div className="col" style={{paddingTop: 15}}> */}
        {/*    <ProgressBar */}
        {/*        needRollingAmount={50000} */}
        {/*        currentRollingAmount={35000} */}
        {/*        isShowProgressNumber */}
        {/*    /> */}
        {/* </div> */}
        {/* <div className="col" style={{paddingTop: 15}}> */}
        {/*    <ProgressBar */}
        {/*        progress={50} */}
        {/*        isShowProgressText */}
        {/*    /> */}
        {/* </div> */}
        {/* <div className="col" style={{paddingTop: 15}}> */}
        {/*    <ProgressBar */}
        {/*        theme="gray" */}
        {/*        progress={68} */}
        {/*    /> */}
        {/* </div> */}
        <div className="col" style={{paddingTop: 15}}>
            <StateComponent/>
        </div>
    </div>
));
