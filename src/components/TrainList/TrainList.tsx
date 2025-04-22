import Button from "../Button/Button";
import styles from "./TrainList.module.css";

function formatDate(datetime: string) {
  const date = new Date(datetime);
  return date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}


export default function TrainList({ trains, onDelete, onEdit }: any) {
  return (
    <table className={styles["train-table"]}>
      <thead>
        <tr>
          <th>Depart From</th>
          <th>Depart To</th>
          <th>Departure Time</th>
          <th>Arrival Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trains.map((t: any) => (
          <tr key={t.id}>
            <td>{t.from}</td>
            <td>{t.to}</td>
            <td>{formatDate(t.departureTime)}</td>
            <td>{formatDate(t.arrivalTime)}</td>
            <td className={styles["buttons-container"]}>
              <Button onClick={() => onEdit?.(t)}>Edit</Button>
              <Button onClick={() => onDelete(t.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
