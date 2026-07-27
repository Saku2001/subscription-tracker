import { format, addDays } from "date-fns";

export default function Timeline() {
  const today = new Date();

  const days = [];

  for (let i = -15; i <= 15; i++) {
    days.push(addDays(today, i));
  }

  console.log(days);

  return (
    <div>
      <h1>Timeline</h1>
    </div>
  );
}
