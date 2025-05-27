import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Coche } from '../types/types';
import { getCocheById, createCoche, updateCoche } from '../api/api';

export const CocheForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coche, setCoche] = useState<Omit<Coche, 'id'> | Coche>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (id) {
      const fetchCoche = async () => {
        try {
          const data = await getCocheById(parseInt(id));
          setCoche(data);
        } catch (error) {
          console.error('Error fetching coche:', error);
        }
      };
      fetchCoche();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoche(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCoche(parseInt(id), coche);
      } else {
        await createCoche(coche);
      }
      navigate('/coches');
    } catch (error) {
      console.error('Error saving coche:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Coche' : 'Nuevo Coche'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Marca:</label>
          <input
            type="text"
            name="brand"
            value={coche.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Modelo:</label>
          <input
            type="text"
            name="model"
            value={coche.model}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Año:</label>
          <input
            type="number"
            name="year"
            value={coche.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 1}
            required
          />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate('/coches')}>
          Cancelar
        </button>
      </form>
    </div>
  );
};