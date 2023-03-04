import {FC, useState} from 'react';
import PickDate from './components/DatePick/PickDate';

const App: FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  return <PickDate value={date} onChange={setDate} />;
};

export default App;
