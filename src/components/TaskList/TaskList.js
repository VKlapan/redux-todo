import css from "./TaskList.module.css";

// Імпортуємо хук
import { useSelector } from "react-redux";
import { Task } from "components/Task/Task";
// Імпортуємо об'єкт значень фільтра
import { statusFilters } from "../../redux/constants";

const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter(task => !task.completed);
    case statusFilters.completed:
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

export const TaskList = () => {
  // Отримуємо масив завдань із стану Redux
  const tasks = useSelector(state => state.tasks);
  console.log("tasks", tasks);
  // Отримуємо значення фільтра із стану Redux
  const statusFilter = useSelector(state => state.filters.status);
  console.log("statusFilter", statusFilter);
  // Обчислюємо масив завдань, які необхідно відображати в інтерфейсі
  const visibleTasks = getVisibleTasks(tasks, statusFilter);

  return (
    <ul className={css.list}>
      {visibleTasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
