import {
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export const CustomToolbar = () => {
    return (
        <GridToolbarContainer sx={{justifyContent: 'space-between', padding: '6px 10px'}}>
            <GridToolbarQuickFilter placeholder="search..."/>


            <div>
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </div>
            
        </GridToolbarContainer>
    );
}
