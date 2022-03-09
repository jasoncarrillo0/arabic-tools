import React from 'react';
import { AccordionSummary} from '@mui/material'
import { uploadAccordionSummaryProps } from '../../helpers/constants';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const CustomAccordionSummary = ({ name }) => {
    return (
        <AccordionSummary sx={uploadAccordionSummaryProps} expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }}/>}>
            <div style={{paddingLeft: '0.5rem'}}>{name}</div>
        </AccordionSummary>
    );
};

export default CustomAccordionSummary;