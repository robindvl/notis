import { Type } from '@nestjs/common';

/**
 * Returns the appropriate repository implementation class based on the USE_MOCKS environment variable.
 */
export function getRepositoryImplementation<T>(remote: Type<any>, mock: Type<any>): Type<T> {
  // Try to get from process.env, with a fallback check for common casing
  const useMocksEnv = process.env.USE_MOCKS || process.env.use_mocks;
  const useMocks = useMocksEnv === 'true';
  
  const implementation = useMocks ? mock : remote;
  
  // Using a simple console.log to be 100% sure it's visible even before Logger is ready
  console.log(`[RepositoryFactory] USE_MOCKS=${useMocksEnv}, using ${useMocks ? 'MOCK' : 'REMOTE'}`);
  
  return implementation as Type<T>;
}

