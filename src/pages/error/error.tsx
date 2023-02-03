import './error.scss';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="error">
        <div className="error__descr">{t('notFound')}</div>
      </div>
    </>
  );
};

export default ErrorPage;
