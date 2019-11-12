// @flow
/**
 * LobbyList Skeleton
 */
import React from 'react';
import uniqueId from 'lodash/uniqueId';

type Props = {
    count: number
};

function Skeleton(props: Props){
    const {count} = props;
    let item = [];
    for(let i=0; i<count;i+=1){
        item.push(
            <div className="col-12 col-lg-8 col-xl-6 col-xxl-4" key={uniqueId('skeleton_')}>
                <div className="lobby-item d-flex align-items-end justify-content-between">
                    <div className="c-skeleton__text-circle w-40" />
                    <div className="c-skeleton__text-circle w-50" />
                </div>
            </div>
        );
    }
    return (
        <div className="container-fluid skeleton__game-lobby">
            <div className="row">
                {item}
            </div>
        </div>
    );
}

export default Skeleton;
