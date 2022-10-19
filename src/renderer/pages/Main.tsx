import { useState, useEffect, ChangeEvent, useDeferredValue } from 'react';
import { DataGrid, GridCellEditCommitParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FilterDialog from 'renderer/components/FilterDialog';
import { PersonFilters } from 'types/Filters';
import { Fields, OneOfFields } from 'types/Data';
import columns from 'renderer/constants/DataGrid';

function WriteData(params: unknown) {
  window.electron.ipcRenderer.sendMessage('write-data', [params]);
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

  const handleEditing = (params: GridCellEditCommitParams): void => {
    const { field, id, value } = params;

    const old = data?.find((e) => e.id === id) as {
      [key in OneOfFields]: string;
    };

    if (old[field as OneOfFields] === value) {
      return;
    }

    WriteData({ field, id, value });
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
