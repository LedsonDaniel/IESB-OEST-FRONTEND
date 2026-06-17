import { Router } from "express"
import { prisma } from "../lib/prisma.js"

export const settingsRoutes = Router()

settingsRoutes.get("/", async (req, res) => {
  try {
    const settings = await prisma.settings.findFirst({
      where: { id: 1 },
    })

    res.json(settings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar settings" })
  }
})


settingsRoutes.put("/", async (req, res) => {
  try {
    const { workTime, shortBreakTime, longBreakTime } = req.body

    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
      create: {
        id: 1,
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    })

    res.json(settings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao atualizar settings" })
  }
})