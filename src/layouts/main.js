// @flow

import React from 'react';

type Props = {
    children?: React.Node,
};

const Main = (props: Props) => {
    const {children} = props;

    return (
        <div className="d-flex flex-column" style={{height: 'inherit'}}>
            <header className="col-auto">
                Header
            </header>

            {children}

            <footer>
                Footer
            </footer>
        </div>
    );
};

Main.defaultProps = {
    children: null,
};

Main.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});

export default Main;
