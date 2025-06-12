import { S3Storage } from './S3';

describe('S3Storage CORS origins', () => {
  const original = process.env.S3_CORS_ORIGINS;
  const dummyS3 = {} as any;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.S3_CORS_ORIGINS;
    } else {
      process.env.S3_CORS_ORIGINS = original;
    }
  });

  it('defaults to wildcard when env var is not set', () => {
    delete process.env.S3_CORS_ORIGINS;
    const storage = new S3Storage({ s3Sdk: dummyS3, bucketName: 'b' });
    expect((storage as any).corsOrigins).toEqual(['*']);
  });

  it('filters out empty strings from env var', () => {
    process.env.S3_CORS_ORIGINS = '*,,';
    const storage = new S3Storage({ s3Sdk: dummyS3, bucketName: 'b' });
    expect((storage as any).corsOrigins).toEqual(['*']);
  });
});
