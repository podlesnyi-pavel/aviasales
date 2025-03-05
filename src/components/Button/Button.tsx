import { FC } from 'react';
import styles from './Button.module.scss';
import { EBorderRadiusType } from './EBorderRadiusType';

interface ButtonProps {
  text: string;
  brandButton?: boolean;
  borderType?: EBorderRadiusType;
  customClass?: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({
  text,
  brandButton = false,
  borderType = '',
  customClass = '',
  onClick,
}) => {
  const brandClass = brandButton ? styles['button--type--brand'] : '';
  const borderRadius = borderType ? styles[`button--br--${borderType}`] : '';

  return (
    <button
      className={`${styles.button} ${brandClass} ${borderRadius} ${customClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
