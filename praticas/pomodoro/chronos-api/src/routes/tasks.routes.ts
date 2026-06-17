import { Router } from "express"
import { prisma } from "../lib/prisma.js"

export const tasksRoutes = Router()

tasksRoutes.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        startDate: "desc",
      },
    })

    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar tasks" })
  }
})


tasksRoutes.post("/", async (req, res) => {
  try {
    const { id, name, duration, type, startDate } = req.body

const task = await prisma.task.create({
  data: {
    id,
    name,
    duration,
    type,
    startDate: new Date(startDate),
  },
})

    res.status(201).json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao criar task" })
  }
})


tasksRoutes.patch("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params
    const { completeDate } = req.body

const task = await prisma.task.update({
  where: { id },
  data: {
    completeDate: new Date(completeDate),
  },
})
    res.json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao completar task" })
  }
})


tasksRoutes.patch("/:id/interrupt", async (req, res) => {
  try {
    const { id } = req.params
    const { interruptDate } = req.body

const task = await prisma.task.update({
  where: { id },
  data: {
    interruptDate: new Date(interruptDate),
  },
})
    res.json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao interromper task" })
  }
})


tasksRoutes.delete("/", async (req, res) => {
  try {
    await prisma.task.deleteMany()

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao limpar tasks" })
  }
})