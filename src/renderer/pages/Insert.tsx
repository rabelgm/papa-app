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

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

function Insert() {
  const [formData, setFormData] = useState<UserData>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target, event.target.value);
    // setFormData(event.target);
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
            <TextField label="Edificio" size="small" variant="filled" />
            <TextField label="Piso" size="small" variant="filled" />
            <TextField
              label="Direccion"
              size="small"
              variant="filled"
              select
              value={formData?.dir}
              onChange={handleChange}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Nombre" size="small" variant="filled" />
            <TextField label="Apellido" size="small" variant="filled" />
            <TextField label="Numero Movil" size="small" variant="filled" />
            <TextField label="Plaza de Garage" size="small" variant="filled" />
            <TextField label="Intercomunicador" size="small" variant="filled" />
            <TextField label="Numero de LLave" size="small" variant="filled" />
            <TextField label="Rol" size="small" variant="filled" />
          </Stack>
        </CardContent>
        <CardActions sx={{ marginTop: 2 }}>
          <Button size="large" variant="contained" fullWidth disableElevation>
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
