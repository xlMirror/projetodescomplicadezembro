import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  MenuItem,
  Select,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

// Declaração do componente EditarTarefa
const EditarTarefa = ({ handleCloseEditar, idTarefaSelecionada, tarefa, setTarefas }) => {
  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [inicioTarefa, setInicioTarefa] = useState('');
  const [fimTarefa, setFimTarefa] = useState('');
  const [recursoTarefa, setRecursoTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');

  // Popula os estados iniciais com os valores recebidos pela tarefa selecionada
  useEffect(() => {
    setIdTarefa(idTarefaSelecionada);
    setTituloTarefa(tarefa.tituloTarefa);
    setDescricaoTarefa(tarefa.descricaoTarefa);
    setInicioTarefa(tarefa.inicioTarefa);
    setFimTarefa(tarefa.fimTarefa);
    setRecursoTarefa(tarefa.recursoTarefa);
    setStatusTarefa(tarefa.statusTarefa);
  }, [idTarefaSelecionada, tarefa]);

  const handleRecurso = (event) => {
    setRecursoTarefa(event.target.value);
  };

  const handleStatus = (event) => {
    setStatusTarefa(event.target.value);
  };

  const handleEditar = () => {
    setTarefas((current) =>
      current.map((obj) => {
        if (obj.idTarefa === idTarefaSelecionada) {
          return {
            ...obj,
            idTarefa: idTarefaSelecionada,
            tituloTarefa: tituloTarefa,
            descricaoTarefa: descricaoTarefa,
            inicioTarefa: inicioTarefa,
            fimTarefa: fimTarefa,
            recursoTarefa: recursoTarefa,
            statusTarefa: statusTarefa,
          };
        }
        return obj;
      })
    );
    handleCloseEditar();
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Card sx={{ margin: '20px auto', width: '100%', maxWidth: 600, padding: '20px' }}>
        <CardHeader title="Editar Tarefa" subheader="Atualize os detalhes da tarefa selecionada" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_titulo">Título</InputLabel>
                <Input
                  id="tarefa_titulo"
                  value={tituloTarefa}
                  onChange={(e) => setTituloTarefa(e.target.value)}
                />
                <FormHelperText>Informe o título da tarefa</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_descricao">Descrição</InputLabel>
                <Input
                  id="tarefa_descricao"
                  value={descricaoTarefa}
                  onChange={(e) => setDescricaoTarefa(e.target.value)}
                />
                <FormHelperText>Informe a descrição da tarefa</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="inicio_tarefa">Início</InputLabel>
                <Input
                  id="inicio_tarefa"
                  type="date"
                  value={inicioTarefa}
                  onChange={(e) => setInicioTarefa(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="fim_tarefa">Fim</InputLabel>
                <Input
                  id="fim_tarefa"
                  type="date"
                  value={fimTarefa}
                  onChange={(e) => setFimTarefa(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="recurso_tarefa_label">Recurso</InputLabel>
                <Select
                  labelId="recurso_tarefa_label"
                  value={recursoTarefa}
                  onChange={handleRecurso}
                >
                  <MenuItem value="Recurso 1">Recurso 1</MenuItem>
                  <MenuItem value="Recurso 2">Recurso 2</MenuItem>
                  <MenuItem value="Recurso 3">Recurso 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="status_tarefa_label">Status</InputLabel>
                <Select
                  labelId="status_tarefa_label"
                  value={statusTarefa}
                  onChange={handleStatus}
                >
                  <MenuItem value="Concluída">Concluída</MenuItem>
                  <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                  <MenuItem value="Aguardando">Aguardando</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleEditar}>
            Salvar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCloseEditar}>
            Cancelar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EditarTarefa;
