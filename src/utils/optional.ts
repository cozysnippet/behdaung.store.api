import { HTTPException } from 'hono/http-exception'

export class Optional<T> {
    
  private constructor(private readonly value: T | null | undefined) {}

  // Equivalent to Optional.ofNullable()
  static of<T>(value: T | null | undefined): Optional<T> {
    return new Optional(value);
  }

  // Equivalent to .isPresent()
  isPresent(): boolean {
    return this.value !== null && this.value !== undefined && this.value !== '';
  }

  // Equivalent to .map()
  map<R>(mapper: (value: T) => R): Optional<R> {
    if (this.isPresent()) {
      return Optional.of(mapper(this.value as T));
    }
    return Optional.of<R>(null);
  }

  // Equivalent to .orElseThrow()
  orElseThrow(message: string = 'Resource not found', status: number = 400): T {
    if (!this.isPresent()) {
      throw new HTTPException(status as any, { message });
    }
    return this.value as T;
  }

  // Equivalent to .orElse()
  orElse(defaultValue: T): T {
    return this.isPresent() ? (this.value as T) : defaultValue;
  }
}