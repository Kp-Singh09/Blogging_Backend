/**
 * @jest-environment node
 */

import request from 'supertest';
import app from '../src/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

afterEach(async () => {
  await prisma.$queryRaw`TRUNCATE TABLE "User" CASCADE;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /api/v1/signup', () => {
  it('should successfully sign up a user with valid data', async () => {
    const response = await request(app)
      .post('/api/v1/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('jwt');
    expect(response.body).toHaveProperty('name', 'Test User');
    expect(response.body).toHaveProperty('id');
  });
});

