import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';

// Set up the rendering context
configure({ testIdAttribute: 'data-testid' });
