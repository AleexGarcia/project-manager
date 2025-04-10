import { it, describe, vi, expect } from 'vitest'
import { Request } from 'express';
import UserService from './UserService';
import UserRepository from './UserRepository';
import UserController from './UserController';
import { makeMockResponse } from '../__mocks__/MockResponse.mock';

vi.mock('./UserRepository', () => {
    return {
        create: vi.fn().mockImplementation((user) => {
            const users = [
                { email: 'teste@email.com', password: '12345678' }
            ];

            const isUnique = !users.find(existingUser => existingUser.email === user.email);
            
            if (isUnique) {
                throw new Error('Email already in use');
            }

            const savedUser = { ...user, _id: 'new_id', role: 'regular' };
            users.push(savedUser);
            return savedUser;
        })
    }
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
            await userController.create(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(201);
            expect(mockResponse.state.json).toMatchObject({ message: 'created' });
        });

        it('Should respond with 400 Bad Request if email or password is missing or invalid (empty, undefined, or null).', async () => {

            const testCases = [
                { email: '', password: '', expectedMessage: 'Email and Password are required' },
                { email: undefined, password: undefined, expectedMessage: 'Email and Password are required' },
                { email: null, password: null, expectedMessage: 'Email and Password are required' }
            ]

            for (const { email, password, expectedMessage } of testCases) {
                const mockRequest = {
                    body: { email, password }
                } as Request;

                const mockResponse = makeMockResponse();
                await userController.create(mockRequest, mockResponse);

                expect(mockResponse.state.status).toBe(400);
                expect(mockResponse.state.json).toMatchObject({ message: expectedMessage });
            }

        });

        it('Should respond with 409 Conflict if the email is already in use', async () => {
            const mockRequest = {
                body: {
                    email: 'alexandre@email.com', password: 'test123'
                }
            } as Request;

            const mockResponse = makeMockResponse();
            await userController.create(mockRequest, mockResponse);

            expect(mockResponse.state.status).toBe(409);
            expect(mockResponse.state.json).toMatchObject({ message: 'Email is already registered.' });
        })

    });
})