interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ variant = 'primary', size = 'medium', label, icon, onClick, ...rest }: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-base hover:bg-blue-dark text-white',
    secondary: 'bg-gray-200 hover:border hover:border-blue-base text-gray-500',
  };

  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-8 w-32 font-semibold text-[12px]',
    large: 'h-12 w-79 text-md',
  };

  const baseClasses = 'flex items-center justify-center px-2 rounded-md disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none';

  const classes = `${variantClasses[variant]} ${sizeClasses[size]} ${baseClasses}`;

  return (
    <button
      type="button"
      {...rest}
      onClick={onClick}
      className={classes}
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        {label}
      </div>
    </button>
  );
}