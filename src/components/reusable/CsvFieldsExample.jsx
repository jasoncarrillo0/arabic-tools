import { Paper } from '@mui/material';
import React from 'react';
import s from './CsvFieldsExample.module.scss';

const CsvFieldsExample = ({ expectedColumns }) => {
    return (
        <Paper el className={s.wrap}>
            <div className={s.innerWrap}>
                <h3>Sheet must contain these columns, with the first row of the sheet including the column name:</h3>
                <hr/>
                <div>
                {
                    expectedColumns.map((column, idx) => <h4 key={idx}>{column}</h4>)
                }
                </div>
            
            </div>
        
        </Paper>
    );
};

export default CsvFieldsExample;