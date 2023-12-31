import * as joi from "joi";
import { Request } from "express";

interface JoiRequestValidatorResponse
{
	error?: string
}

interface JoiRouteValidator
{
	route: string,
	method: string,
	validatorSchema: joi.ObjectSchema<any>
}

class JoiRequestValidator 
{
	private bodyFormat = joi.object({
		id: joi.string().alphanum().min(3).max(30).required()
	});

	private login = joi.object({
		username: joi.string().min(3).max(30).required(),
		password: joi.string().min(8).max(30).required()
	});

	validators: JoiRouteValidator[] = 
	[
		// EXEMPLE
		// {
		// 	route: "/conversations/:id",
		// 	method: "POST",
		// 	validatorSchema: bodyFormat,
		// }
		{
			route: "/test",
			method: "GET",
			validatorSchema: this.bodyFormat,
		},{
			route: "/login",
			method: "POST",
			validatorSchema: this.login,
		}
	];

	

	validate(request: Request): JoiRequestValidatorResponse 
	{
		// request.baseUrl contient l'URL de base, avant application des middlewares.
		// request.route.path contient l'URL que vous déclarez dans votre middleware de routage.
		// console.log('Request:', request.route);
		console.log(request.baseUrl);
		//console.log(request.route.path);

		/* 
			ETAPE 1:

			Trouver dans la liste de validators, le validator qui correspond à la route de la requête.
		*/
		const routeValidator = this.validators.find(
			(validator) =>
			validator.route === request.route.path &&
			validator.method === request.method
		);

		// console.log(routeValidator);

		/* 
			ETAPE 2:

			Si le validator n'existe pas
				=> retourner un objet vide.
			Si le validator existe 
				=> valider le body de la requête.
				=> Si le body est valide
					=> retourner un objet vide.
				=> Si le body est invalide
					=> retourner un objet avec une clé error contenant les details de l'erreur.
		*/

		if (!routeValidator) {
			return {};
		}
	  
		const { error } = routeValidator.validatorSchema.validate(request.body);
	  
		if (error) {
			return { error: error.details[0].message };
		}

		return {};
	}
}

export const JoiRequestValidatorInstance = new JoiRequestValidator();