const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const getMagazines = async (req, res) => {
  const magazines = await prisma.magazine.findMany({
    orderBy: {
      id: "asc", // Descending order
    },
  });
  res.json(magazines);
};

export const addMagazine = async (req, res) => {
  const { title, description, subscriptionStatus, language, category } = req.body;

  try {
    const magazine = await prisma.magazine.create({
      data: {
        title,
        description,
        subscriptionStatus,
        language,
        category,
      },
    });
    res.json(magazine);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const updateMagazine = async (req, res) => {
  const { id } = req.params;
  const { title, description, subscriptionStatus, language, category } = req.body;

  try {
    const magazine = await prisma.magazine.update({
      where: {
        id: +id,
      },
      data: {
        title,
        description,
        subscriptionStatus,
        language,
        category,
      },
    });

    res.json(magazine);
  } catch (e) {
    res.status(400).json({ error: e.meta.cause });
  }
};

export const deleteMagazine = async (req, res) => {
  const { id } = req.params;

  try {
    const magazine = await prisma.magazine.delete({
      where: {
        id: +id,
      },
    });
    res.json(magazine);
  } catch (e) {
    res.json({ error: e.meta.cause });
  }
};
