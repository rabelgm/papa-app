import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import { GridColDef } from '@mui/x-data-grid';
import { PersonFilters } from 'types/Filters';

export interface SimpleDialogProps {
  open: boolean;
  onApply: (data: PersonFilters) => void;
  onClose: () => void;
  columns: GridColDef[];
}

function FilterDialog(props: SimpleDialogProps) {
  const { onApply, onClose, columns, open } = props;
  const [filters, setFilters] = useState<PersonFilters>({});

  const handleClose = () => {
    setFilters({});
    onClose();
  };

  const handleApply = () => {
    onApply(filters);
    setFilters({});
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set filters</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gap: '15px',
            paddingTop: '10px',
          }}
        >
          {columns.map((col) => (
            <TextField
              key={col.field}
              label={col.headerName}
              onChange={(e) => {
                setFilters((prevState) => ({
                  ...prevState,
                  [col.field]: e.target.value,
                }));
              }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleApply} autoFocus>
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterDialog;
