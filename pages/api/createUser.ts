import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userData = JSON.parse(req.body);

  const savedUser = await prisma.user.create({
    data: userData,
  });

  res.status(200).json(savedUser);
};
