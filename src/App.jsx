import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import NewQuotes from './pages/NewQuotes';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuotes = lazy(() => import('./pages/NewQuotes'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AllQuotes = lazy(() => import('./pages/AllQuotes'));
const QuotesDetail = lazy(() => import('./pages/QuotesDetail'));
const Comments = lazy(() => import('./components/comments/Comments'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quotesId" element={<QuotesDetail />}>
            <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuotes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
