import QuoteForm from '../components/quotes/QuoteForm';
import { useNavigate } from 'react-router-dom';
import useHttp from '../components/hooks/use-http';
import { addQuote } from '../components/lib/api';

import { useEffect } from 'react';
const NewQuotes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  useEffect(() => {
    if (status === 'completed') {
      navigate('/quotes');
    }
  }, [status, navigate]);
  return (
    <QuoteForm
      isLoading={status === 'pending'}
      onAddQuote={addQuoteHandler}
    ></QuoteForm>
  );
};
export default NewQuotes;
