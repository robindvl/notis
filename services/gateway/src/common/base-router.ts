export abstract class BaseRouter {
  abstract routes: {
    [prefix: string]: object;
  };
}
