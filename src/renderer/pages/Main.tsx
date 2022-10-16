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
import { PersonFilters } from 'renderer/types/Filters';
import { Fields } from 'renderer/types/Data';

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

async function WriteData(params) {
  const json = JSON.stringify(params);
  await window.electron.ipcRenderer.sendMessage('write-data', json);
}

function Main() {
  const [data, setData] = useState<Fields[]>();
  const [filters, setFilters] = useState<PersonFilters>({});
  const [checked, setChecked] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const defferedData = useDeferredValue(data);

  useEffect(() => {
    // calling IPC exposed from preload script
    window.electron.ipcRenderer.on('read-data', (arg: unknown) => {
      // eslint-disable-next-line no-console
      setData(JSON.parse(arg as string) as Fields[]);
    });

    window.electron.ipcRenderer.sendMessage('read-data');

    return () => {
      setData(undefined);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleEditing = async (
    params: GridCellEditCommitParams,
    event: MuiEvent<MuiBaseEvent>,
    details: GridCallbackDetails
  ): Promise<void> => {
    console.log(params, event, details);

    await WriteData(params);
  };

  const handleApplyFilters = async (dialogFilters: PersonFilters) => {
    setIsFilterOpen(false);
    setFilters(dialogFilters);
  };

  const filteredData = defferedData?.filter((person) => {
    if (Object.keys(filters).length === 0) return true;

    const filterKeys = Object.keys(filters) as (keyof typeof filters)[];
    return filterKeys.every((key) => {
      return person[key]
        ?.toLowerCase()
        .includes(filters[key]?.toLowerCase() || '');
    });
  });

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
        rows={filteredData || []}
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
