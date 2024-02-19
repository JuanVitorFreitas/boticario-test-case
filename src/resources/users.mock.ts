import { Role } from '../enums/roles.enum';

export const createUserResponseMock = {
    id: 1,
    name: 'Usuário',
    email: 'usuario@teste.com',
    role: Role.Admin,
    phoneNumber: '11999999999',
    status: 'active',
    createdAt: '2024-02-18 08:59:34.507',
};

export const usersMock = [
    {
        id: 1,
        name: 'Usuário',
        email: 'usuario@teste.com',
        password:
            '$2b$10$.fEkMhJ4IaqWcN1PbNkvau6MM8JzJj6950Yk9H.6wABxoQFnSYFde',
        role: Role.Admin,
        phoneNumber: '11999999999',
        status: 'active',
        createdAt: '2024-02-18 08:59:34.507',
    },
    {
        id: 2,
        name: 'Usuário1',
        email: 'usuario1@teste.com',
        password:
            '$2b$10$.fEkMhJ4IaqWcN1PbNkvau6MM8JzJj6950Yk9H.6wABxoQFnSYFde',
        role: Role.Admin,
        phoneNumber: '11999999999',
        status: 'active',
        createdAt: '2024-02-18 08:59:34.507',
    },
    {
        id: 3,
        name: 'Usuário2',
        email: 'usuario2@teste.com',
        password:
            '$2b$10$.fEkMhJ4IaqWcN1PbNkvau6MM8JzJj6950Yk9H.6wABxoQFnSYFde',
        role: Role.Admin,
        phoneNumber: '11999999999',
        status: 'active',
        createdAt: '2024-02-18 08:59:34.507',
    },
    {
        id: 4,
        name: 'Usuário3',
        email: 'usuario3@teste.com',
        password:
            '$2b$10$.fEkMhJ4IaqWcN1PbNkvau6MM8JzJj6950Yk9H.6wABxoQFnSYFde',
        role: Role.Admin,
        phoneNumber: '11999999999',
        status: 'active',
        createdAt: '2024-02-18 08:59:34.507',
    },
];

export const prismaMock = {
    user: {
        create: jest.fn().mockReturnValue(usersMock[0]),
        findMany: jest.fn().mockResolvedValue(usersMock),
        findUnique: jest.fn().mockResolvedValue(usersMock[0]),
        findFirst: jest.fn().mockResolvedValue(usersMock[0]),
        update: jest.fn().mockResolvedValue(usersMock[0]),
        delete: jest.fn(),
    },
};
