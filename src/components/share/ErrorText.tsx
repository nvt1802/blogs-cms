interface IProps {
  isError: boolean;
  message?: string;
}

const ErrorText: React.FC<IProps> = ({ isError, message }) => {
  return (
    <>
      {isError && (
        <p role="alert" className="text-red-600 text-sm">
          {message}
        </p>
      )}
    </>
  );
};

export default ErrorText;
