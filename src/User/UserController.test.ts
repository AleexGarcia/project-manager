import { it, describe, vi, expect } from 'vitest'
import { Request } from 'express';
import UserService from './UserService';
import UserRepository from './UserRepository';
import UserController from './UserController';
import { makeMockResponse } from '../__mocks__/MockResponse.mock';
import { User } from './UserModel';
import { userDTO } from '../utils/dtos/userDTO';
import { userRole } from '../utils/enum/userRole';

vi.mock('./UserRepository', () => {
    return {
        default: vi.fn().mockImplementation(() => {
            return {
                create: vi.fn().mockImplementation(async (email: string, password: string) => {

                    const users = [
                        { email: 'teste@email.com', password: '12345678' }
                    ];
                    const newUser = { email, password };
                    const isUnique = !users.find(existingUser => existingUser.email === newUser.email);

                    if (!isUnique) {
                        const error = new Error('Email is already registered.');
                        error.name = 'ConflictError';
                        throw error;
                    }

                    await User.validate({ email, password });

                    const savedUser = { ...newUser, _id: 'new_id', role: 0 };
                    users.push(savedUser);
                    return savedUser;
                }),
                findAll: vi.fn().mockImplementation(async () => {
                    const users: userDTO[] = [
                        { email: 'teste@email.com', password: '12345678', role: userRole.regular, _id: '1', createdAt: new Date(), updatedAt: new Date() },
                        { email: 'teste@email.com', password: '12345678', role: userRole.regular, _id: '1', createdAt: new Date(), updatedAt: new Date() },
                    ];
                    return users;
                }),
                findOne: vi.fn().mockImplementation(async (id: string) => {
                    const users: userDTO[] = [
                        { email: 'teste@email.com', password: '12345678', role: userRole.regular, _id: '1', createdAt: new Date(), updatedAt: new Date() },
                    ];
                    const result = users.find(user => user._id === id);
                    if (!result) {
                        const error = new Error('User not found');
                        error.name = 'NotFoundError';
                        throw error;
                    }
                    return result;
                }),
                update: vi.fn().mockImplementation(async (email: string, password: string, role: userRole, id: string) => {
                    let users: userDTO[] = [
                        { email: 'teste@email.com', password: '12345678', role: userRole.regular, _id: '1', createdAt: new Date(), updatedAt: new Date() },
                        { email: 'teste@email.com', password: '12345678', role: userRole.regular, _id: '2', createdAt: new Date(), updatedAt: new Date() },
                    ];

                    const updateUser = users.findIndex(user => user._id === id);

                    if (updateUser < 0) {
                        const error = new Error('User not Found');
                        error.name = 'ErrorNotFound';
                        throw error;
                    }

                    users[updateUser] = {
                        ...users[updateUser],
                        email: email,
                        password: password,
                        role: role,
                        updatedAt: new Date()
                    }

                    return users[updateUser];

                }),
                delete: vi.fn().mockImplementation(async (id: string) => {
                    let users: userDTO[] = [
                        {
                            _id: '1',
                            email: 'teste@email.com',
                            password: '12345678',
                            role: userRole.regular,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        {
                            _id: '2',
                            email: 'teste2@email.com',
                            password: 'senha123',
                            role: userRole.admin,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    ];

                    const userIndex = users.findIndex(user => user._id === id);

                    if (userIndex < 0) {
                        const error = new Error('User not Found');
                        error.name = 'ErrorNotFound';
                        throw error;
                    }

                    const deletedUser = users.splice(userIndex, 1)[0];

                    return deletedUser;
                })
            };
        })
    };
});

const mockedUserRepository = new UserRepository();
const userService = new UserService(mockedUserRepository);
const userController = new UserController(userService);

describe('UserController', () => {
    describe('POST /users', () => {
        it('should create a new user', async () => {
            const mockRequest = {
                body: {
                    email: 'alexandre@email.com', password: 'test123'
                }
            } as Request;
            const mockResponse = makeMockResponse();
            await userController.create(mockRequest, mockResponse);
            console.log(mockResponse);
            expect(mockResponse.state.status).toBe(201);
            expect(mockResponse.state.json).toMatchObject({ ...mockRequest.body, _id: 'new_id', role: 'regular' });
        });

        it('Should respond with 400 Bad Request if email or password is missing or invalid (empty, undefined, or null).', async () => {

            const testCases = [
                {
                    email: '', password: '', expectedMessage: ["Email is required", "Password is required"]
                },
                { email: undefined, password: undefined, expectedMessage: ["Email is required", "Password is required"] },
                { email: null, password: null, expectedMessage: ["Email is required", "Password is required"] }
            ]

            for (const { email, password, expectedMessage } of testCases) {
                const mockRequest = {
                    body: { email, password }
                } as Request;

                const mockResponse = makeMockResponse();
                await userController.create(mockRequest, mockResponse);

                expect(mockResponse.state.status).toBe(400);
                expect(mockResponse.state.json).toMatchObject({ message: ["Email is required", "Password is required"] });
            }

        });

        it('Should respond with 409 Conflict if the email is already in use', async () => {
            const mockRequest = {
                body: {
                    email: 'teste@email.com', password: 'test123'
                }
            } as Request;

            const mockResponse = makeMockResponse();
            await userController.create(mockRequest, mockResponse);

            expect(mockResponse.state.status).toBe(409);
            expect(mockResponse.state.json).toMatchObject({ message: 'Email is already registered.' });
        })

    });

    describe('GET /users', () => {
        it('Should be return all users in db if has one or more', async () => {
            const mockRequest = {} as Request;
            const mockResponse = makeMockResponse();
            await userController.findAll(mockRequest, mockResponse);
            console.log(mockResponse);
            expect(mockResponse.state.status).toBe(200);
            expect(mockResponse.state.json).toBeDefined();

            const users = mockResponse.state.json as userDTO[];

            users.forEach(user => {
                expect(typeof user._id).toBe('string');
                expect(typeof user.createdAt).toBe('Date');
                expect(typeof user.updatedAt).toBe('Date');
                expect(typeof user.email).toBe('string');
                expect(typeof user.password).toBe('string');
                expect(Object.values(userRole).filter(value => typeof value === 'number')).toContain(user.role);
            })
        })
        it('Should return an empty array if there are no users registered', async () => {
            const mockRequest = {} as Request;
            const mockResponse = makeMockResponse();
            await userController.findAll(mockRequest, mockResponse);
            console.log(mockResponse);
            expect(mockResponse.state.status).toBe(200);
            expect(mockResponse.state.json).toBeDefined();
            const users = mockResponse.state.json as userDTO[];
            expect(users).toMatchObject([]);

        })
    })

    describe('GET /user/:id', () => {

        it('should return a valid user when a matching ID is provided', async () => {
            const mockRequest = { params: { id: '1' } } as unknown as Request;
            const mockResponse = makeMockResponse();
            await userController.findOne(mockRequest, mockResponse);
            expect(mockResponse.state.status).toBe(200);
            expect(mockResponse.state.json).toBeDefined();
            const user = mockResponse.state.json as userDTO;
            expect(user._id).toBe('1');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('role');
            expect(user).toHaveProperty('createdAt');
            expect(user).toHaveProperty('updatedAt');
        });

        it('should throw a 404 error if the user with the provided ID is not found', async () => {
            const mockRequest = { params: { id: '0' } } as unknown as Request;
            const mockResponse = makeMockResponse();
            await userController.findOne(mockRequest, mockResponse);
            expect(mockResponse.state.status).toBe(404);
            expect(mockResponse.state.json).toMatchObject({ message: 'User not found' });

        })

    })

    describe('PUT /user/:id', () => {
        it('should update user data when valid ID is provided', async () => {
            const mockRequest = {
                body: {
                    email: 'novo@email.com',
                    password: 'novasenha',
                    role: userRole.admin
                },
                params: {
                    id: '1'
                }
            } as unknown as Request;

            const mockResponse = makeMockResponse();

            await userController.update(mockRequest, mockResponse);

            expect(mockResponse).toBeDefined();
            const updateUser = mockResponse.state.json as userDTO;
            expect(updateUser._id).toBe('1');
            expect(updateUser.email).toBe('novo@email.com');
            expect(updateUser.password).toBe('novasenha');
            expect(updateUser.role).toBe(userRole.admin);
            expect(updateUser.updatedAt).toBeInstanceOf(Date);

        });

        it('should return 404 when user ID does not exist', async () => {
            const mockRequest = {
                body: {
                    email: 'x@email.com',
                    password: 'senha',
                    role: userRole.regular
                },
                params: {
                    id: '999'
                }
            } as unknown as Request;

            const mockResponse = makeMockResponse();

            await userController.update(mockRequest, mockResponse);

            expect(mockResponse.state.status).toBe(404);
            expect(mockResponse.state.json).toHaveProperty('message', 'User not Found');
        });

        it('should keep original fields like _id and createdAt untouched after update', async () => {
            const mockRequest = {
                body: {
                    email: 'email@novo.com',
                    password: '123456',
                    role: userRole.regular
                },
                params: {
                    id: '2'
                }
            } as unknown as Request;

            const mockResponse = makeMockResponse();

            await userController.update(mockRequest, mockResponse);

            const updatedUser = mockResponse.state.json as userDTO;

            expect(updatedUser._id).toBe('2');
            expect(updatedUser.createdAt).toBeInstanceOf(Date);
        });

        it('should update email, password and role fields correctly', async () => {
            const mockRequest = {
                body: {
                    email: 'outro@email.com',
                    password: '99999',
                    role: userRole.admin
                },
                params: {
                    id: '2'
                }
            } as unknown as Request;

            const mockResponse = makeMockResponse();

            await userController.update(mockRequest, mockResponse);

            const updatedUser = mockResponse.state.json as userDTO;

            expect(updatedUser.email).toBe('outro@email.com');
            expect(updatedUser.password).toBe('99999');
            expect(updatedUser.role).toBe(userRole.admin);
        });

    })

    describe('DELETE /user/:id', () => {
       
        it('should return deleted user when a valid ID is provided', async () => {
            const mockRequest = {
                params: { id: '1' }
            } as unknown as Request;

            const mockResponse = makeMockResponse();

            await userController.delete(mockRequest, mockResponse);

            expect(mockResponse.state.status).toBe(200);
            expect(mockResponse.state.json).toBeDefined();

            const deletedUser = mockResponse.state.json as userDTO;

            expect(deletedUser._id).toBe('1');
            expect(deletedUser).toHaveProperty('email');
            expect(deletedUser).toHaveProperty('role');
            expect(deletedUser).toHaveProperty('createdAt');
            expect(deletedUser).toHaveProperty('updatedAt');
        });

        it('should return 404 when ID does not exist', async () => {
            const mockRequest = {
                params: { id: '999' }
            } as unknown as Request;

            const mockResponse = makeMockResponse();

            await userController.delete(mockRequest, mockResponse);

            expect(mockResponse.state.status).toBe(404);
            expect(mockResponse.state.json).toHaveProperty('message', 'User not Found');
        });

    })
})