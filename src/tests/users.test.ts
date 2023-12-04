import http from "http";
import { Express } from "express";
import { setup, teardown } from "./setupTests";
import supertest from "supertest";

describe('USERS', () => 
{
	let app:Express, server:http.Server;

	beforeAll(async () => {
		let res = await setup();
		app = res.app; 
		server = res.server;
	});

	afterAll(async () => {
		await teardown();
	});

	test("Login unexisting user", async () => {
		const response = await supertest(app)
            .post("/users/login")
            .send({ username: "test3", password: "testpwd3" });

        expect(response.status).toBe(200);
	});

	test("Login existing user", async () => {
		const response = await supertest(app)
            .post("/users/login")
            .send({ username: "test2", password: "testpwd2" });

        expect(response.status).toBe(200);
	});

	test("Login wrong password", async () => {
		const response = await supertest(app)
            .post("/users/login")
            .send({ username: "test2", password: "wrongggg" });

        expect(response.status).toBe(401);
	});

	test("GET active users", async () => {

	});
});