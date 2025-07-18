import { constants } from "../lib/constants";
import { link } from "../shared/links";
import { Icon } from "./Icon";
import { Search } from "./Search";
import { db } from "@/db";
import { Prisma } from "@generated/prisma";

export type AddOnWithCategory = Prisma.AddOnGetPayload<{
  include: {
    category: true;
  };
}>;

const Nav = async () => {
  // get all the add-ons that are approved
  // NOTE: Once we have more add-ons, I'll need to change this
  const addOns = await db.addOn.findMany({
    where: {
      status: {
        name: "approved",
      },
    },
    include: {
      category: true,
    },
  });
  return (
    <nav className="main-nav font-chicago w-full">
      <ul className="flex items-center justify-between md:justify-end md:gap-8 w-full">
        <li>
          <a href={link("/")}>Home</a>
        </li>
        <li>
          <a href={link("/docs/:slug", { slug: "introduction" })}>Add Ons</a>
        </li>
        <li>
          <a href={constants.DOCS} className="flex items-center gap-[2px]">
            RWSDK Docs
            <Icon id="externalLink" size={16} className="relative -top-[1px]" />
          </a>
        </li>
        {/* <li>
            <a href="#">Request an Add On</a>
          </li> */}
        {/* <li>
              <ThemeSwitcher />
            </li> */}
        <li className="hidden md:block">
          <Search addOns={addOns} />
        </li>
      </ul>
    </nav>
  );
};

export { Nav };
