import { GridColDef } from '@mui/x-data-grid';

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

export default columns;
