import React, { useState, useEffect } from 'react';
import { PropType, APIURL, getPropList } from '../Helpers';
import { AppContext } from '../../App';

import style from './style.module.css';

export function SearchBar(): React.ReactElement {
    const ctx = React.useContext(AppContext);

    const [loading, setLoading] = React.useState(true);
    const [searchString, setSearchString] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        getPropList(ctx).then(() => {
            setLoading(false);
        });
    }, [searchString]);

    const freeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchString(e.target.value);
    };

    return (
        <div className={style.searchBarContainer}>
            <form className="">
                <input
                    className=""
                    type="text"
                    placeholder="Search"
                    id="searchString"
                    value={searchString}
                    onChange={freeSearchInput}
                />
                <button className="" type="submit">
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
}
