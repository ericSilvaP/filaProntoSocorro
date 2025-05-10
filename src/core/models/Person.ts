import { Gender } from '@/types/gender'

export abstract class Person {
  constructor(
    protected id: number,
    protected cpf: string,
    protected name: string,
    protected birthDate: Date,
    protected gender: Gender,
    protected adress: string,
    protected phoneNumber?: number[] | undefined,
  ) {}

  getCpf(): string {
    return this.cpf
  }

  getName(): string {
    return this.name
  }

  getBDate(): Date {
    return this.birthDate
  }

  getGender(): string {
    return this.gender
  }

  getAdress(): string {
    return this.adress
  }

  getPhones(): number[] | undefined {
    return this.phoneNumber
  }

  abstract toString(): string
}
