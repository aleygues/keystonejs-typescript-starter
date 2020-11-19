import * as express from 'express';

const router = express.Router();

/** 
 * If needed, add some route here, for instance:
 * router.get('/api/content', (req, res) => { ... });
 * see Express API endpoints for more information
 */
router.get('/api/medias/:filename', (req: express.Request, res: express.Response) => {
    res.sendFile((process.env.STORAGE_PATH || '../storage') + '/' + req.params.filename);
});

export const apiRouter = router;