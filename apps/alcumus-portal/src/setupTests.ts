import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/react/dont-cleanup-after-each';

beforeEach(() => {
  document.body.innerHTML = '';
});