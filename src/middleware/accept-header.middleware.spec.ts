import { AcceptHeaderMiddleware } from './accept-header.middleware';

describe('AcceptHeaderMiddleware', () => {
  it('should be defined', () => {
    expect(new AcceptHeaderMiddleware()).toBeDefined();
  });
});
