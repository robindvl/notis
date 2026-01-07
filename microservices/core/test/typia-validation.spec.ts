import typia from 'typia';
import { NoteCreateDto } from '@repo/domain';

describe('Typia Validation', () => {
  it('should validate NoteCreateDto', () => {
    const validData: NoteCreateDto = {
      title: 'Test Note',
      type: 'note',
      spaceId: '018d1a2b-3c4d-7e8f-9a0b-1c2d3e4f5g6h', // valid-ish UUID format for type checking
    };

    const result = typia.validate<NoteCreateDto>(validData);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid NoteCreateDto', () => {
    const invalidData = {
      title: 123, // Should be string
      type: 'invalid-type',
    };

    const result = typia.validate<NoteCreateDto>(invalidData as any);
    expect(result.success).toBe(false);
    if (!result.success) {
      console.log('Validation errors:', JSON.stringify(result.errors, null, 2));
    }
  });
});

