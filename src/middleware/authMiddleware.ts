import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'deft';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Token manquant. Authentification requise.' });
    }

    jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(401).json({ error: 'Token non autorisé.' });
        }
        console.log(decoded)
        // Si le token est valide, ajoutez les informations utilisateur décodées à la requête
        req.app.locals.userId = decoded.userId;

        next();
    });
}

export default authMiddleware;
