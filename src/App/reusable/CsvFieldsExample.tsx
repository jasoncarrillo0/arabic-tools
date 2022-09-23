import { Paper } from '@mui/material';
import s from './CsvFieldsExample.module.scss';

const CsvFieldsExample = ({ expectedColumns }: { expectedColumns: string[] }) => {
    return (
        <Paper className={s.wrap}>
            <div className={s.innerWrap}>
                <h3>The first row of the sheet must contains these columns:</h3>
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