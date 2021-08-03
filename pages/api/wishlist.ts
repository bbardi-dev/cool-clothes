import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
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
  }

  if (req.method === "DELETE") {
    const data = JSON.parse(req.body);

    const wishlistWithoutItem = await prisma.user.update({
      where: { uid: data.uid },
      data: {
        wishlist: data.wishlist,
      },
    });
    return res.status(200).json(wishlistWithoutItem);
  }

  if (req.method === "POST") {
    const { uid } = JSON.parse(req.body);

    const wishlistItems = await prisma.user.findUnique({
      select: { wishlist: true, displayName: true },
      where: { uid: uid },
    });
    return res.status(200).json(wishlistItems);
  }

  return res.status(405).json({ message: "Method not allowed" });
};
