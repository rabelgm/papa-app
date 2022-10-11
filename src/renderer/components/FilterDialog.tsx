import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import { GridColDef } from '@mui/x-data-grid';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  columns: GridColDef[];
}

function FilterDialog(props: SimpleDialogProps) {
  const { onClose, columns, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set filters</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gap: '5px',
          }}
        >
          {columns.map((col) => (
            <TextField label={col.headerName} />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose} autoFocus>
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterDialog;
