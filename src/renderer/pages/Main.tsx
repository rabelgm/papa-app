import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns: GridColDef[] = [
  {
    field: 'building',
    headerName: 'Edificio',
    editable: true,
  },
  {
    field: 'floor',
    headerName: 'Piso',
    editable: true,
  },
  {
    field: 'dir',
    headerName: 'Direccion',
    type: 'number',
    editable: true,
  },
  {
    field: 'firstName',
    headerName: 'Nombre',
    description: 'Nombre del inquilino.',
    editable: true,
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    description: 'Apellido del inquilino.',
    width: 150,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Movil',
    width: 150,
    editable: true,
  },
  {
    field: 'garagePlace',
    headerName: 'Plaza',
    description: 'Plaza de Aparcamiento.',
    editable: true,
  },
  {
    field: 'interCom',
    headerName: 'Telefonillo',
    editable: true,
  },
  {
    field: 'keyNumb',
    headerName: 'No. Llave',
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Tipo',
    editable: true,
  },
];

function Main() {
  const [data, setData] = useState<{ name: string }[] | undefined>();

  useEffect(() => {
    // calling IPC exposed from preload script
    window.electron.ipcRenderer.once('read-data', (arg) => {
      // eslint-disable-next-line no-console
      setData(JSON.parse(arg) as { name: string }[]);
    });

    window.electron.ipcRenderer.sendMessage('read-data');

    return () => {
      setData(undefined);
    };
  }, []);

  return (
    <Box sx={{ height: '750px', display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        rows={data || []}
        columns={columns}
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={(params, event, details) => {
          console.log(params, event, details);
        }}
      />
    </Box>
  );
}

export default Main;
