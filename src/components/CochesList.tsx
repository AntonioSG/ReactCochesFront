import { useEffect, useState } from 'react';
import type { Coche } from '../types/types';
import { getCoches, deleteCoche } from '../api/api';
import { Link } from 'react-router-dom';

export const CochesList = () => {
  const [coches, setCoches] = useState<Coche[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoches = async () => {
      try {
        const data = await getCoches();
        setCoches(data);
      } catch (error) {
        console.error('Error fetching coches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoches();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCoche(id);
      setCoches(coches.filter(coche => coche.id !== id));
    } catch (error) {
      console.error('Error deleting coche:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Lista de Coches</h1>
      <Link to="/coches/new">Agregar Nuevo Coche</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {coches.map(coche => (
            <tr key={coche.id}>
              <td>{coche.id}</td>
              <td>{coche.brand}</td>
              <td>{coche.model}</td>
              <td>{coche.year}</td>
              <td>
                <Link to={`/coches/${coche.id}`}>Editar</Link>
                <button onClick={() => handleDelete(coche.id!)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};