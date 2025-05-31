import { Request, Response } from 'express'

export const getHello = (_req: Request, res: Response) => {
  res.json({ message: 'Привет с backend!' })
}