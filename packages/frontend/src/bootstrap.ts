import ReactDOM, { Root } from 'react-dom/client';

export const bootstrap = (): Root => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('No root element found!');
  }

  return ReactDOM.createRoot(rootElement);
}
