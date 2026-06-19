import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const routerMock = { navigate: (_path: string[]) => {} } as any;
  const authServiceMock = { estaLogado: () => true } as any;

  beforeEach(() => {
    guard = new AuthGuard(authServiceMock, routerMock);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
