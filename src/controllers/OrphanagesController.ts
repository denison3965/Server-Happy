import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanages from '../models/ophanages'

export default {

    async index(req: Request, res : Response){
        //creating a method based in my Orphanages Model to can manage in our database
        const orphanagesRepository = getRepository(Orphanages)

        const orphanages = await orphanagesRepository.find()

        return res.json(orphanages)


    },

    async show(req : Request, res : Response){

        const { id } = req.params

        //creating a method based in my Orphanages Model to can manage in our database
        const orphanagesRepository = getRepository(Orphanages)

        const orphanage = await orphanagesRepository.findOneOrFail(id)

        return res.json(orphanage)
    },

    async create(req : Request, res : Response){
        //geting information passed for user through disruption
        const {
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends
        } = req.body;

        //creating a method based in my Orphanages Model to can manage in our database
        const orphanagesRepository = getRepository(Orphanages)


        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(images => {

            return { path: images.filename}
        })

        //creating a new orphanage with the information received to client
        const orphanage = orphanagesRepository.create({
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,
            images
        })

        //saving this new orphanage created above in our database
        await orphanagesRepository.save(orphanage)


        return res.status(201).json(orphanage)
    }
}