import { useState } from 'react';
import { UserData } from 'types/Data';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import users from '../../../assets/user.svg';

const directions = [
  {
    value: 'IZQ',
    label: 'Izquierda',
  },
  {
    value: 'DCH',
    label: 'Derecha',
  },
];
const rol = [
  {
    value: 'Inquilino',
    label: 'Inquilino',
  },
  {
    value: 'Propietario',
    label: 'Propietario',
  },
];

function createUser(params: unknown) {
  window.electron.ipcRenderer.sendMessage('user:create', [params]);
}

function Insert() {
  const [formData, setFormData] = useState<UserData>({
    dir: 'IZQ',
    role: 'Inquilino',
  });

  const handleChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [key]: event.target.value });
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100%',
        paddingTop: 3,
      }}
    >
      <Box
        sx={{
          borderRight: '1px solid lightgray',
          borderTop: '1px solid lightgray',
          borderTopRightRadius: '5px',
          padding: 3,
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(50px)',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight={600}
            color="text.primary"
            sx={{ marginTop: 1, marginBottom: 3 }}
          >
            Insertar Inquilino
          </Typography>
          <Stack spacing={3}>
            <TextField
              required
              label="Edificio"
              size="small"
              variant="filled"
              value={formData?.building}
              onChange={(e) => handleChange('building', e)}
            />
            <TextField
              required
              label="Piso"
              size="small"
              variant="filled"
              value={formData?.floor}
              onChange={(e) => handleChange('floor', e)}
            />
            <TextField
              required
              label="Direccion"
              size="small"
              variant="filled"
              select
              value={formData?.dir}
              onChange={(e) => handleChange('dir', e)}
            >
              {directions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              label="Nombre"
              size="small"
              variant="filled"
              value={formData?.firstName}
              onChange={(e) => handleChange('firstName', e)}
            />
            <TextField
              required
              label="Apellido"
              size="small"
              variant="filled"
              value={formData?.lastName}
              onChange={(e) => handleChange('lastName', e)}
            />
            <TextField
              required
              label="Numero Movil"
              size="small"
              variant="filled"
              value={formData?.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e)}
            />
            <TextField
              required
              label="Plaza de Garage"
              size="small"
              variant="filled"
              value={formData?.garagePlace}
              onChange={(e) => handleChange('garagePlace', e)}
            />
            <TextField
              required
              label="Intercomunicador"
              size="small"
              variant="filled"
              value={formData?.interCom}
              onChange={(e) => handleChange('interCom', e)}
            />
            <TextField
              required
              label="Numero de LLave"
              size="small"
              variant="filled"
              value={formData?.keyNumb}
              onChange={(e) => handleChange('keyNumb', e)}
            />
            <TextField
              required
              label="Rol"
              size="small"
              variant="filled"
              select
              value={formData?.role}
              onChange={(e) => handleChange('role', e)}
            >
              {rol.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </CardContent>
        <CardActions sx={{ marginTop: 2 }}>
          <Button
            onClick={() => {
              createUser(formData);
            }}
            size="large"
            variant="contained"
            fullWidth
            disableElevation
          >
            Crear
          </Button>
        </CardActions>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <img
          width="1200px"
          src={users}
          alt=""
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            zIndex: '-1',
          }}
        />
      </Box>
    </Box>
  );
}

export default Insert;
