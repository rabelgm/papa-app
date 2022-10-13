import { useState, useEffect, ChangeEvent, useDeferredValue } from 'react';
import {
  DataGrid,
  GridCallbackDetails,
  GridCellEditCommitParams,
  GridColDef,
  MuiBaseEvent,
  MuiEvent,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FilterDialog from 'renderer/components/FilterDialog';

const columns: GridColDef[] = [
  {
    field: 'building',
    headerName: 'Edificio',
  },
  {
    field: 'floor',
    headerName: 'Piso',
  },
  {
    field: 'dir',
    headerName: 'Direccion',
    type: 'number',
  },
  {
    field: 'firstName',
    headerName: 'Nombre',
    description: 'Nombre del inquilino.',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    description: 'Apellido del inquilino.',
    width: 150,
  },
  {
    field: 'phoneNumber',
    headerName: 'Movil',
    width: 150,
  },
  {
    field: 'garagePlace',
    headerName: 'Plaza',
    description: 'Plaza de Aparcamiento.',
  },
  {
    field: 'interCom',
    headerName: 'Telefonillo',
  },
  {
    field: 'keyNumb',
    headerName: 'No. Llave',
  },
  {
    field: 'role',
    headerName: 'Tipo',
  },
];

function Main() {
  const [data, setData] = useState<{ name: string }[] | undefined>();
  const [filters, setFilters] = useState<{ name: string }[] | undefined>();
  const [checked, setChecked] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const defferedData = useDeferredValue(data);

  useEffect(() => {
    // calling IPC exposed from preload script
    window.electron.ipcRenderer.on('read-data', (arg) => {
      // eslint-disable-next-line no-console
      setData(JSON.parse(arg) as { name: string }[]);
    });

    window.electron.ipcRenderer.sendMessage('read-data');

    return () => {
      setData(undefined);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleEditing = (
    params: GridCellEditCommitParams,
    event: MuiEvent<MuiBaseEvent>,
    details: GridCallbackDetails
  ): void => {
    console.log(params, event, details);
  };

  const handleApplyFilters = async (filters) => {
    setIsFilterOpen(false);

    const filteredData = defferedData?.filter((person) => {
      return Object.keys(filters).every((key) => {
        return person[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });

    setData(filteredData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Activar Edicion"
            labelPlacement="start"
          />
        </FormGroup>
        <Button
          startIcon={<FilterAltIcon />}
          onClick={() => {
            setIsFilterOpen(true);
            window.electron.ipcRenderer.sendMessage('read-data');
          }}
        >
          Abrir Filtros
        </Button>
        <FilterDialog
          open={isFilterOpen}
          onApply={handleApplyFilters}
          onClose={() => {
            setIsFilterOpen(false);
          }}
          columns={columns}
        />
      </Box>
      <DataGrid
        rows={defferedData || []}
        columns={columns.map((col) => ({ ...col, editable: checked }))}
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={handleEditing}
      />
    </Box>
  );
}

export default Main;
