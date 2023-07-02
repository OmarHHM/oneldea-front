import React, { useState, useContext, useEffect } from "react";
import { EmailContext } from './EmailContext';
import '../styles/RegistrationForm.css'
import { DataGrid} from '@mui/x-data-grid';
import Modal from "react-modal";
import Edit from "./Edit";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Bots = () => {
    const { email, setEmail } = useContext(EmailContext);
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editedRows, setEditedRows] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    Modal.setAppElement('#root'); 
    useEffect(() => {
        if (email) {
          fetch('http://localhost:8080/bots?user=' + email)
            .then(response => response.json())
            .then(apiData => {
              setData(apiData);
            })
            .catch(error => {
              console.error('Error al obtener los datos de la API:', error);
            });
        }
      }, [email]);
      const handleOpen = () => {
        setModalIsOpen(true);
      };
      const handleClose = () => {
        setModalIsOpen(false);
      };
      const closeModal = () => {
        setModalIsOpen(false);
      };
      const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
          field: 'name',
          headerName: 'CELEBRIDAD',
          width: 150,
          editable: true,
        },
        {
          field: 'telegram_token',
          headerName: 'TOKEN',
          width: 400,
          editable: true,
        },
        {
          field: 'instagram',
          headerName: 'INSTAGRAM',
          width: 110,
          editable: true,
        },
        {
          field: 'status',
          headerName: 'ESTATUS',
          sortable: true,
          editable: true,
          width: 160,
          renderCell: (params) => (
            <Select
            value={params.row.status || ''}
            onChange={(event) => handleEditCellChange({ id: params.id, field: 'status', value: event.target.value })}
              style={{ width: '100%' }}
            >
              <MenuItem value="active">Activo</MenuItem>
              <MenuItem value="inactive">Inactivo</MenuItem>
            </Select>
          ),
        },
      ];
      const handleEditCellChange = (params) => {
        const { id, field, value } = params;      
        setEditedRows((prevEditedRows) => {
          const updatedRows = [...prevEditedRows];
          const rowToUpdate = updatedRows.find((row) => row.id === id);
          if (rowToUpdate) {
            rowToUpdate[field] = value;
          } else {
            updatedRows.push({ id, [field]: value });
          }
          return updatedRows;
        });
      };
      useEffect(() => {
        if (editedRows.length > 0) {
          // Realizar la solicitud a la API para actualizar los datos
          fetch('http://localhost:8080/bots', {
            method: 'PUT',
            body: JSON.stringify(editedRows),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((responseData) => {
              // Actualizar el estado 'data' con los datos actualizados de la API
              setData((prevData) => {
                const updatedData = [...prevData];
                editedRows.forEach((editedRow) => {
                  const rowIndex = updatedData.findIndex((row) => row.id === editedRow.id);
                  if (rowIndex !== -1) {
                    updatedData[rowIndex] = { ...updatedData[rowIndex], ...editedRow };
                  }
                });
                return updatedData;
              });
      
              // Limpiar el estado 'editedRows'
              setEditedRows([]);
            })
            .catch((error) => {
              console.error('Error al llamar a la API:', error);
            });
        }
      }, [editedRows]);
    return (
        <div>
            <div className="section-add">
                <h2>Configura tu Bot</h2>
                <button className="form-button" onClick={handleOpen}>Crear Bot</button>
            </div>
            <br/>
            <br/>

                <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
                  onEditCellChange={handleEditCellChange}
                />
              </div>
              <Modal appElement={document.getElementById('root')} isOpen={modalIsOpen} onRequestClose={closeModal}>
              <Edit param={'add'} param1={data} handleClose={handleClose} />
              </Modal>
        </div>
      );
    };
    
    export default Bots;