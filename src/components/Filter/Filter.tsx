import { FC } from 'react';
import styles from './Filter.module.scss';

interface FilterItemProps {
  text: string;
}

const FilterItem: FC<FilterItemProps> = ({ text }) => {
  return (
    <li className={styles['filter-item']}>
      <label className={styles['filter-item__label']} htmlFor={text}>
        <input
          className={styles['filter-item__checkbox']}
          type="checkbox"
          id={text}
        />
        {text}
      </label>
    </li>
  );
};

interface FilterProps {
  title: string;
}

const Filter: FC<FilterProps> = ({ title }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filters__title}>{title}</div>
      <ul className={styles.filters__list}>
        <FilterItem text="Все" />
        <FilterItem text="Без пересадок" />
        <FilterItem text="1 пересадка" />
        <FilterItem text="2 пересадки" />
        <FilterItem text="3 пересадки" />
      </ul>
    </div>
  );
};

export default Filter;
