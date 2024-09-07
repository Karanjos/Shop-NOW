import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import { MdOutlineShoppingBag, MdShoppingBag } from "react-icons/md";

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});

const Navbar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl flex items-center gap-1`}
            >
              <MdOutlineShoppingBag size={45} className="-mt-2" />
              SHOP~NOW
            </Link>

            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
export default Navbar;
