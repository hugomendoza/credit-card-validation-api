/* eslint-disable @typescript-eslint/no-explicit-any */
export class GetTransactionDto {
  private constructor(public readonly id: string) {}

  static create(props: { [key: string]: any }): [string?, GetTransactionDto?] {
    const { id } = props;

    if (!id) return ['El parámetro id es obligatorio'];

    return [undefined, new GetTransactionDto(id)];
  }
}
