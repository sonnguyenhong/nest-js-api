export class RegisterCustomerDto {
    name: string;
    idCardNumber: string;
    email: string;
    username: string;
    password: string;
    confirmedPassword: string;
    address: string;
    phone: string;
    isEcoparkMember: boolean;
    status: number;
    ecoparkId?: string;
    createdAt: Date;
    updatedAt?: Date;
}