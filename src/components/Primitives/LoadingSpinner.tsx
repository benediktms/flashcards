type Props = {
  showText?: boolean;
  text?: string;
};

export const LoadingSpinner: React.FC = ({
  showText,
  text = 'Loading...',
}: Props) => {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <span className="block h-6 w-6 animate-spin rounded-full border-4 border-t-blue-300" />
      {showText && <span>{text}</span>}
    </div>
  );
};
