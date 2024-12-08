import { useCallback, useState } from 'react';
import ListItem from './components/ListItem';
import styles from './TodoList.module.scss';

export interface ListItemType {
  text: string;
  isChecked: boolean;
  id: string;
}

const useTodoList = () => {
  const [listItems, setListItems] = useState<ListItemType[]>([
    { text: 'Buy milk', isChecked: false, id: '1' },
    { text: '2 milk', isChecked: false, id: '2' },
    { text: '3 milk', isChecked: false, id: '3' },
  ]);

  const addListItem = useCallback((newListItem: ListItemType) => {
    setListItems((prevListItems) => [...prevListItems, newListItem]);
  }, []);

  const onChecked = useCallback((id: string) => {
    setListItems((prevListItems) => {
      return prevListItems.map((prevListItem) => prevListItem.id === id ? {
        ...prevListItem,
        isChecked: !prevListItem.isChecked,
      } : prevListItem
      );
    });
  }, []);
  return { listItems, addListItem, onChecked };
};

const TodoList = () => {
  const { addListItem, listItems, onChecked } = useTodoList();
  return (
    <ul className={styles.list}>
      {listItems.map((listItem) => (
        <ListItem key={listItem.id} listItem={listItem}  onChecked={onChecked}/>
      ))}
    </ul>
  );
};

export default TodoList;
