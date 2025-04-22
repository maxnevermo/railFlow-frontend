import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainForm from "../components/TrainForm/TrainForm";
import TrainList from "../components/TrainList/TrainList";
import { api } from "../api";
import styles from "./Trains.module.css";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

export default function Trains() {
  const [trains, setTrains] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTrain, setSelectedTrain] = useState(null);
  const navigate = useNavigate();

  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortTrains = (trains: any[]) => {
    if (!sortField) return trains;

    return [...trains].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (sortField === 'departureTime' || sortField === 'arrivalTime') {
        return sortDirection === 'asc'
          ? new Date(aVal).getTime() - new Date(bVal).getTime()
          : new Date(bVal).getTime() - new Date(aVal).getTime();
      }

      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  };

  const load = async () => {
    const res = await api(`/trains`);
    setTrains(res);
  };

  const addOrUpdateTrain = async (train: any) => {
    if (train.id) {
      await api(`/trains/${train.id}`, 'PUT', train);
    } else {
      await api('/trains', 'POST', train);
    }
    setSelectedTrain(null);
    load();
  };

  const deleteTrain = async (id: number) => {
    await api(`/trains/${id}`, 'DELETE');
    load();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/");
    } else {
      load();
    }
  }, []);

  return (
    <div>
      <div className={styles["top-bar"]}>
        <Button isPrimary={true} onClick={handleLogout}>Logout</Button>
      </div>

      <h2 className={styles["header"]}>Trains</h2>
      <div className={styles["search-input"]}>
        <Input label="" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <TrainForm
        onSubmit={addOrUpdateTrain}
        initialData={selectedTrain}
      />
      <div className={styles["sort-container"]}>
      <label>Sort by:</label>
      <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
        <option value="">-- None --</option>
        <option value="from">Depart From</option>
        <option value="to">Depart To</option>
        <option value="departureTime">Departure Time</option>
        <option value="arrivalTime">Arrival Time</option>
      </select>

      <Button isPrimary={true} onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}>
        {sortDirection === 'asc' ? '⬆ Ascending' : '⬇ Descending'}
      </Button>
    </div>
        <TrainList
      trains={sortTrains(
        trains.filter(t =>
          t.from.toLowerCase().includes(search.toLowerCase()) ||
          t.to.toLowerCase().includes(search.toLowerCase())
        )
      )}
      onDelete={deleteTrain}
      onEdit={setSelectedTrain}
    />
    </div>
  );
}
