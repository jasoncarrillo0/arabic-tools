import React from 'react';
import s from './CsvFieldsExample.module.scss';

const CsvFieldsExample = ({ expectedColumns }) => {
    return (
        <div className={s.wrap}>
        {
            expectedColumns.map(column => <h3>{column}</h3>)
        }
        </div>
    );
};

export default CsvFieldsExample;