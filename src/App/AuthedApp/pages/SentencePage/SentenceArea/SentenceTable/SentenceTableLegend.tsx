import { Box, List, ListItem, ListItemText, ListItemIcon, Paper } from '@mui/material';
import s from './SentenceTableLegend.module.scss';
import ListSubheader from '@mui/material/ListSubheader';
import { UNRESOLVED_TABLE_ROW_COLOR } from './SentenceTableRow';
import { useAuth } from 'src/contexts/AuthContext';

const shapeStyles = { 
    width: 20, 
    height: 20, 
    borderRadius: '50%' ,
    border: '0.2px solid grey'
};
const UnresolvedSentence = () => (
  <Box component="span" sx={{ ...shapeStyles, bgcolor: UNRESOLVED_TABLE_ROW_COLOR  }} />
);
const NormalSentence = () => (
    <Box component="span" sx={{ ...shapeStyles  }} />
  );

const SentenceTableLegend = () => {

    const { isAdminUser } = useAuth()
    return (
        <Paper className={s.wrap}>
            <List dense subheader={<ListSubheader>Legend</ListSubheader>}>
                <ListItem>
                    <ListItemIcon>
                        <NormalSentence/>
                    </ListItemIcon>
                    <ListItemText>Up to date sentence</ListItemText>
                    
                </ListItem>
                <ListItem >
                    <ListItemIcon>
                        <UnresolvedSentence/>
                    </ListItemIcon>
                    <ListItemText>
                    {
                        isAdminUser ? (
                            "Contains out of sync words - resolve english and/or arabic sentence."
                        ) : (
                            "Contains unresolved changes by an admin user. Don't use."
                        )
                    }    
                    </ListItemText>
                    
                </ListItem>
                
            </List>
        </Paper>
        
    )
}

export default SentenceTableLegend;