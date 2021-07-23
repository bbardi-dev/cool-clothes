import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST" || req.method === "PUT") {
    const data = JSON.parse(req.body);
    const addedItem = await prisma.user.update({
      where: { uid: data.uid },
      data: {
        wishlist: {
          push: data.wishlistItem,
        },
      },
    });
    return res.status(200).json(addedItem);
  } else if (req.method === "GET") {
    const data = JSON.parse(req.body);

    const wishlistItems = await prisma.user.findUnique({
      select: { wishlist: true, displayName: true },
      where: { uid: data.uid },
    });
    return res.status(200).json(wishlistItems);
  }

  return res.status(405).json({ message: "Method not allowed" });
};
