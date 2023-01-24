export const FullScreenLoadingSpinner: React.FC = () => {
  return (
    <div className="inset-0 flex h-screen items-center justify-center">
      <span className="my-20 block h-28 w-28 animate-spin rounded-full border-8 border-t-blue-300" />
    </div>
  );
};
