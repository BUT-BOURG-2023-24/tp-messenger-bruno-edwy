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

        expect(response.status).toBe(200); // Assuming you return a 200 status for non-existing users
        // Add more assertions based on your application's behavior
	});

	test("Login existing user", async () => {
		const response = await supertest(app)
            .post("/users/login")
            .send({ username: "test2", password: "testpwd2" });

        expect(response.status).toBe(200); // Assuming you return a 200 status for successful logins
        // Add more assertions based on your application's behavior
	});

	test("Login wrong password", async () => {
		const response = await supertest(app)
            .post("/users/login")
            .send({ username: "test2", password: "wrongggg" });

        expect(response.status).toBe(401); // Assuming you return a 200 status for successful logins
        // Add more assertions based on your application's behavior
	});

	test("GET active users", async () => {

	});
});