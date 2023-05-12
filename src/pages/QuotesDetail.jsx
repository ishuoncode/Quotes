import { Fragment, useEffect } from 'react';
import { useParams, Link, Outlet, useResolvedPath } from 'react-router-dom';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
// import Comments from "../components/comments/Comments";

// import { Path } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../components/hooks/use-http';
import { getSingleQuote } from '../components/lib/api';

const QuotesDetail = () => {
  const params = useParams();
  const url = useResolvedPath('').pathname;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  const { quotesId } = params;
  useEffect(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }
  const LoadButton = (
    <div className="centered">
      <Link className="btn--flat" to={'comments'}>
        Load Comments
      </Link>
    </div>
  );

  const showLoadButton = window.location.pathname === `${url}`;

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {showLoadButton && LoadButton}
      <Outlet />
    </Fragment>
  );
};

export default QuotesDetail;
