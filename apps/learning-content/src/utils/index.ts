import { BadRequestException } from '@nestjs/common';

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function stringToNumber(
  value: string,
  opts: ToNumberOptions = {},
): number {
  if (!value) {
    throw new BadRequestException('The value must not be empty');
  }
  const newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    throw new BadRequestException('The value must be a number');
  }

  if (opts.min && newValue < opts.min) {
    throw new BadRequestException(
      `The value must be greater than or equal to ${opts.min}`,
    );
  }

  if (opts.max && newValue > opts.max) {
    throw new BadRequestException(
      `The value must be less than or equal to ${opts.max}`,
    );
  }
  return newValue;
}
