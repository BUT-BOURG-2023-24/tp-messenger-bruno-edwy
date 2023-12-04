import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'deft'; // Remplacez par votre clé secrète JWT

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Récupérer le token depuis le header Authorization
    const token = req.header('Authorization');

    // Vérifier si le token est présent
    if (!token) {
        return res.status(401).json({ error: 'Token manquant. Authentification requise.' });
    }

    // Vérifier la validité du token
    jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(401).json({ error: 'Token non autorisé.' });
        }
        console.log(decoded)
        // Si le token est valide, ajoutez les informations utilisateur décodées à la requête
        req.app.locals.userId = decoded.userId;

        // Passez au middleware suivant
        next();
    });
}

export default authMiddleware;
