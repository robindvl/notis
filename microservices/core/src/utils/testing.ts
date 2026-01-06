import { isObservable } from 'rxjs/internal/util/isObservable';
import { Block } from 'src/@generated/models/block';

export function validateObject(
  object: Record<string, any>,
  expectedFields: Record<string, any>,
): void {
  Object.entries(expectedFields).forEach(([key, type]) => {
    expect(object).toHaveProperty(key);
    expect(typeof object[key]).toBe(typeof type);
    expect(object[key]).toBeDefined();
  });
}

export async function handleResult(result: any): Promise<Block[]> {
  if (isObservable(result)) {
    const promiseResult = await result.toPromise();
    if (promiseResult === undefined) {
      throw new Error('Observable returned undefined');
    }
    if (!Array.isArray(promiseResult)) {
      throw new Error('Expected array result');
    }
    return [...(promiseResult as Block[])];
  }

  if (result === undefined) {
    throw new Error('Result is undefined');
  }
  if (!Array.isArray(result)) {
    throw new Error('Expected array result');
  }

  return [...(result as Block[])];
}
