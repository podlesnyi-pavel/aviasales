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
  borderType,
  customClass = '',
  onClick,
}) => {
  const mainClass = 'button';
  let borderRadius = '';

  if (borderType === EBorderRadiusType.Left) {
    borderRadius = styles[`${mainClass}--br--left`];
  }

  if (borderType === EBorderRadiusType.Right) {
    borderRadius = styles[`${mainClass}--br--right`];
  }

  if (borderType === EBorderRadiusType.Both) {
    borderRadius = styles[`${mainClass}--br--both`];
  }

  return (
    <button
      className={`${styles.button} ${brandButton ? styles[`${mainClass}--type--brand`] : ''} ${borderRadius} ${customClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
