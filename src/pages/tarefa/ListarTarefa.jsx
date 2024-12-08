import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Modal,
  IconButton,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

function createData(idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Em Andamento', 'Recurso 5'),
  createData(6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-07', '2022-01-08', 'Aguardando', 'Recurso 6'),
];

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openDeletar, setOpenDeletar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState(null);
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);
  const handleOpenDeletar = (id) => {
    setIdTarefaSelecionada(id);
    setOpenDeletar(true);
  };
  const handleCloseDeletar = () => setOpenDeletar(false);

  const handleEditar = (id) => {
    const tarefaParaEditar = tarefas.find((tarefa) => tarefa.idTarefa === id);
    setTarefa(tarefaParaEditar);
    handleOpenEditar();
  };

  const handleDeletar = () => {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.idTarefa !== idTarefaSelecionada));
    handleCloseDeletar();
  };

  const filteredTarefas = tarefas.filter((row) => {
    const matchesStatus = statusFilter ? row.statusTarefa === statusFilter : true;
    const matchesSearch = row.tituloTarefa.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <Card sx={{ maxWidth: 1200, margin: 'auto', mt: 3, boxShadow: 3 }}>
        <CardHeader
          title="Tarefas"
          subheader="Gerencie suas tarefas de forma eficiente"
          sx={{ textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Concluída">Concluída</MenuItem>
                <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                <MenuItem value="Aguardando">Aguardando</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Buscar Tarefa"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="tabela de tarefas">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Início</TableCell>
                  <TableCell align="right">Fim</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTarefas.map((row) => (
                  <TableRow hover key={row.idTarefa}>
                    <TableCell>{row.idTarefa}</TableCell>
                    <TableCell>{row.tituloTarefa}</TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">
                      <span style={{ color: getStatusColor(row.statusTarefa) }}>
                        {row.statusTarefa}
                      </span>
                    </TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleEditar(row.idTarefa)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleOpenDeletar(row.idTarefa)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Criar Tarefa
          </Button>
        </CardActions>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, mx: 'auto', mt: 5, width: 400 }}>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </Box>
      </Modal>

      <Modal open={openEditar} onClose={handleCloseEditar}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, mx: 'auto', mt: 5, width: 400 }}>
          <EditarTarefa
            handleCloseEditar={handleCloseEditar}
            idTarefaSelecionada={idTarefaSelecionada}
            tarefa={tarefa}
            setTarefas={setTarefas}
          />
        </Box>
      </Modal>

      <Dialog open={openDeletar} onClose={handleCloseDeletar}>
        <DialogTitle>Confirmar Deletação</DialogTitle>
        <DialogContent>Tem certeza de que deseja excluir esta tarefa?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeletar} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeletar} color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Concluída':
      return 'green';
    case 'Em Andamento':
      return 'orange';
    case 'Aguardando':
      return 'gray';
    default:
      return 'black';
  }
};

export default ListarTarefa;
