import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from "./TrainForm.module.css";

export default function TrainForm({ onSubmit, initialData = {} }: any) {
  const [train, setTrain] = useState({
    id: null,
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
  });

  useEffect(() => {
    if (initialData) {
      setTrain({
        id: initialData.id || null,
        from: initialData.from || '',
        to: initialData.to || '',
        departureTime: initialData.departureTime || '',
        arrivalTime: initialData.arrivalTime || '',
      });
    } else {
      setTrain({
        id: null,
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
      });
    }
  }, [initialData]);
  

  function handleSaveButton(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(train);
    setTrain({ id: null, from: '', to: '', departureTime: '', arrivalTime: '' });
  }

  return (
    <form className={styles["form-container"]} onSubmit={handleSaveButton}>
      <div className={styles["input-container"]} >
        <Input label='' placeholder="From" value={train.from} onChange={e => setTrain({ ...train, from: e.target.value })} />
        <Input label='' placeholder="To" value={train.to} onChange={e => setTrain({ ...train, to: e.target.value })} />
      </div>
      <div className={styles["input-container"]} >
        <Input label='' type="datetime-local" placeholder="Departure Time" value={train.departureTime} onChange={e => setTrain({ ...train, departureTime: e.target.value })} />
        <Input label='' type="datetime-local" placeholder="Arrival Time" value={train.arrivalTime} onChange={e => setTrain({ ...train, arrivalTime: e.target.value })} />
      </div>
      <Button isPrimary={true} onClick={handleSaveButton}>{train.id ? 'Edit' : 'Save'}</Button>
    </form>
  );
}
