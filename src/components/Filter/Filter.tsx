import { FC } from 'react';
import styles from './Filter.module.scss';
import { TTransferFiltersItem } from '@/store/slices/transferFilter';

interface FilterItemProps {
  item: TTransferFiltersItem;
  onChange: (id: number) => void;
}

const FilterItem: FC<FilterItemProps> = ({
  item: { id, title, value },
  onChange,
}) => {
  return (
    <li className={styles['filter-item']}>
      <label className={styles['filter-item__label']} htmlFor={id.toString()}>
        <input
          className={styles['filter-item__checkbox']}
          type="checkbox"
          id={id.toString()}
          checked={value}
          onChange={() => {
            onChange(id);
          }}
        />
        {title}
      </label>
    </li>
  );
};

interface FilterProps {
  title: string;
  items: TTransferFiltersItem[];
  onChangeItem: (id: number) => void;
}

const Filter: FC<FilterProps> = ({ title, items, onChangeItem }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filters__title}>{title}</div>
      <ul className={styles.filters__list}>
        {items.map((item) => (
          <FilterItem key={item.id} item={item} onChange={onChangeItem} />
        ))}
      </ul>
    </div>
  );
};

export default Filter;
